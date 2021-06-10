import {
  useState,
  useContext,
  createContext,
  FunctionComponent,
  useEffect,
  Dispatch,
  SetStateAction,
  useCallback,
} from 'react';
import { DraggableLocation, DropResult } from 'react-beautiful-dnd';
import {
  getBoard,
  getUserBoards,
  createBoard,
  updateBoardName,
  createColumn,
  deleteColumn,
  updateColumnName,
  createCard,
  deleteCard,
  updateCard,
  swapBoardColumns,
  swapCardsOutsideColumn,
  moveFocusedCard,
  deleteBoard,
  copyFocusedCard,
} from '../helpers/';
import { useSnackBar, useAuth } from './';
import { IKanbanContext, IColumn, ICard, IBoard, ICardUpdateData, INewBoardApiData } from '../interface/';
import { useBatchUpdater } from '../hooks/useBatchUpdater';
import { useHistory } from 'react-router-dom';
export const KanbanContext = createContext<IKanbanContext>({} as IKanbanContext);
export const KanbanProvider: FunctionComponent = ({ children }): JSX.Element => {
  const [activeBoard, setActiveBoard] = useState<IBoard>({
    _id: 'Initial',
    name: 'Initial',
    columns: [],
    cards: [],
    user: 'Initial',
    createdAt: 'Initial',
  });
  const [userBoards, setUserBoards] = useState<IBoard[]>([]);
  const [focusedCard, setFocusedCard] = useState<ICard | null>(null);
  const { updateSnackBarMessage } = useSnackBar();
  const { loggedInUser } = useAuth();
  const history = useHistory();
  const [, cardOutsideColumnBatch] = useBatchUpdater<{
    source: DraggableLocation;
    destination: DraggableLocation;
  }>(swapCardsOutsideColumn, 2500);
  useEffect(() => {
    if (loggedInUser) {
      fetchUserBoards();
    }
  }, [loggedInUser]);
  const fetchUserBoards = async () => {
    const request = await getUserBoards();
    setUserBoards(request.boards);
  };
  const sendToFirstBoard = useCallback(async () => {
    const { boards } = await getUserBoards();
    if (boards && boards.length > 0) {
      history.push(`/dashboard/board/${boards[0]._id}`);
      setActiveBoard(boards[0]);
      return;
    }
    history.push(`/newboard`);
  }, []);
  /** Dragging function for columns/cards */
  const handleDragEnd = async (result: DropResult): Promise<void> => {
    if (!result.destination) return;
    const { destination, source, draggableId, type } = result;
    if (type === 'column') {
      await swapColumns(source, destination);
      return;
    }
    const sourceColumnIndex = activeBoard.columns.findIndex((col) => col._id === source.droppableId);
    const destinationColumnIndex = activeBoard.columns.findIndex((col) => col._id === destination.droppableId);
    if (sourceColumnIndex < 0 || destinationColumnIndex < 0) return;
    // Reordering cards inside same column
    if (source.droppableId === destination.droppableId) {
      return;
    }
    // Moving card to different column
    if (source.droppableId !== destination.droppableId) {
      const homeColumn = activeBoard.columns[activeBoard.columns.findIndex((col) => col._id === source.droppableId)];
      const newColumns =
        activeBoard.columns[activeBoard.columns.findIndex((col) => col._id === destination.droppableId)];
      const [card] = homeColumn.cards.splice(source.index, 1);
      newColumns.cards.splice(destination.index, 0, card);
      const batch = {
        key: card._id,
        change: {
          destination,
          source,
        },
      };
      cardOutsideColumnBatch(batch);
      setActiveBoard(activeBoard);
      return;
    }
  };

  /*    Boards Section   */
  const fetchBoard = async (id: string): Promise<IBoard | void> => {
    const { board } = await getBoard(id);
    if (!board) {
      sendToFirstBoard();
      return;
    }
    setActiveBoard(board);
    return board;
  };
  const createNewBoard = async (name: string): Promise<INewBoardApiData> => {
    const request = await createBoard(name);
    if (request.board) setUserBoards((boards) => [...boards, request.board]);
    return request;
  };
  const updateBoardsName = async (id: string, name: string, setSubmitting: (isSubmitting: boolean) => void) => {
    const request = await updateBoardName(id, name);
    const clonedUserBoards = userBoards.slice();
    const updatedBoardIndex = userBoards.findIndex((board) => board._id === activeBoard._id);
    clonedUserBoards[updatedBoardIndex] = request;
    setSubmitting(false);
    setActiveBoard(request);
    setUserBoards(clonedUserBoards);
    return request;
  };
  const removeBoard = async (id: string) => {
    const remainingBoards = await deleteBoard(id);
    setUserBoards(remainingBoards);
    //show first board if we deleted the activeBoard
    if (activeBoard._id === id) setActiveBoard(remainingBoards[0]);
    return;
  };
  const updateActiveCard = async (data: ICardUpdateData) => {
    if (focusedCard) {
      const request = await updateCard(focusedCard._id, data);
      // setActiveBoard(request);
    }
    return;
  };
  /*    Columns Section   */
  const addColumn = async (side: string, name: string): Promise<void> => {
    const request = await createColumn(activeBoard._id, side, name);
    setActiveBoard(request);
  };
  const removeColumn = async (columnId: string): Promise<void> => {
    const request = await deleteColumn(activeBoard._id, columnId);
    setActiveBoard(request);
  };
  const renameColumn = async (
    columnId: string,
    columnName: string,
    setIsRenaming: Dispatch<SetStateAction<boolean>>,
    setSubmitting: (isSubmitting: boolean) => void,
  ) => {
    const request = await updateColumnName(columnId, columnName);
    setSubmitting(false);
    setIsRenaming(false);
    setActiveBoard(request);
  };
  const swapColumns = async (source: DraggableLocation, destination: DraggableLocation): Promise<void> => {
    const request = await swapBoardColumns(activeBoard._id, source, destination);
    setActiveBoard(request);
  };
  const getColumnById = (columnId: string): IColumn => {
    const colIndex = activeBoard.columns.findIndex((col) => col._id === columnId);
    if (colIndex > -1) return activeBoard.columns[colIndex];
    return activeBoard.columns[colIndex];
  };
  /*    Cards Section   */
  const addCard = async (title: string, tag: string, columnId: string): Promise<void> => {
    const request = await createCard(title, tag, columnId);
    setActiveBoard(request);
  };
  const removeCard = async (cardId: string): Promise<void> => {
    const request = await deleteCard(cardId);
    setActiveBoard(request);
  };
  const moveCard = async (destination: IColumn): Promise<void> => {
    if (!focusedCard) {
      updateSnackBarMessage('No focus card found!', 'error');
      return;
    }
    const request = await moveFocusedCard(destination._id, focusedCard._id);
    setActiveBoard(request);
    resetOpenCard();
  };
  const copyCard = async (destination: IColumn): Promise<void> => {
    if (!focusedCard) {
      updateSnackBarMessage('No focus card found!', 'error');
      return;
    }
    const request = await copyFocusedCard(destination._id, focusedCard._id);
    setActiveBoard(request);
    resetOpenCard();
  };
  const setOpenCard = (card: ICard): void => setFocusedCard(card);
  const resetOpenCard = (): void => setFocusedCard(null);
  return (
    <KanbanContext.Provider
      value={{
        activeBoard,
        focusedCard,
        userBoards,
        addCard,
        setOpenCard,
        resetOpenCard,
        getColumnById,
        handleDragEnd,
        setActiveBoard,
        renameColumn,
        removeColumn,
        fetchBoard,
        createNewBoard,
        moveCard,
        copyCard,
        addColumn,
        updateBoardsName,
        removeBoard,
        removeCard,
        updateActiveCard,
        sendToFirstBoard,
      }}
    >
      {children}
    </KanbanContext.Provider>
  );
};
export function useKanban(): IKanbanContext {
  const ctx = useContext(KanbanContext);
  if (!ctx) throw new Error('useKanban must be used within KanbanProvider');
  return ctx;
}
