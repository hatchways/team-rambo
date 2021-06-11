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
  updateBoard,
  createColumn,
  deleteColumn,
  updateColumn,
  createCard,
  deleteCard,
  updateCard,
  swapCards,
  moveFocusedCard,
  deleteBoard,
  copyFocusedCard,
  swapColumns,
} from '../helpers';
import { useSnackBar, useAuth } from './';
import { IKanbanContext, IColumn, ICard, IBoard, ICardUpdateData, IBoardApiData } from '../interface/';
import { useBatchUpdater } from '../hooks/useBatchUpdater';
import { useHistory } from 'react-router-dom';

export const KanbanContext = createContext<IKanbanContext>({} as IKanbanContext);
export const KanbanProvider: FunctionComponent = ({ children }): JSX.Element => {
  const [fetchingBoard, setFetchingBoard] = useState<boolean>(false);
  const [activeBoard, setActiveBoard] = useState<IBoard>({
    _id: 'Initial',
    name: 'Initial',
    columns: [],
    cards: [],
    user: 'Initial',
    createdAt: 'Initial',
  });
  const [userBoards, setUserBoards] = useState<IBoard[]>([]);
  const [focusedCard, setFocusedCard] = useState<ICard>({} as ICard);
  const { updateSnackBarMessage } = useSnackBar();
  const { loggedInUser } = useAuth();
  const history = useHistory();

  const [, swapColumnsBatch] = useBatchUpdater<{
    source: DraggableLocation;
    destination: DraggableLocation;
  }>(swapColumns, 2500);

  const [, swapCardsBatch] = useBatchUpdater<{
    source: DraggableLocation;
    destination: DraggableLocation;
  }>(swapCards, 2500);

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
      history.push(`/dashboard/boards/${boards[0]._id}`);
      setActiveBoard(boards[0]);
      return;
    }
    history.push(`/newboard`);
  }, [history]);

  /** Dragging function for columns/cards */
  const handleDragEnd = async (result: DropResult): Promise<void> => {
    if (!result.destination) return;
    const { destination, source, type } = result;
    if (type === 'column') {
      const [homeColumn] = activeBoard.columns.splice(source.index, 1);
      activeBoard.columns.splice(destination.index, 0, homeColumn);
      const batch = {
        key: homeColumn._id,
        change: {
          destination,
          source,
        },
      };
      swapColumnsBatch(batch);
      setActiveBoard(activeBoard);
      return;
    }
    const sourceColumnIndex = activeBoard.columns.findIndex((col) => col._id === source.droppableId);
    const destinationColumnIndex = activeBoard.columns.findIndex((col) => col._id === destination.droppableId);
    if (sourceColumnIndex < 0 || destinationColumnIndex < 0) return;

    // Reordering cards inside same column
    if (source.droppableId === destination.droppableId) {
      const homeColumn = activeBoard.columns[sourceColumnIndex];
      const [card] = homeColumn.cards.splice(source.index, 1);
      homeColumn.cards.splice(destination.index, 0, card);
      const batch = {
        key: card._id,
        change: {
          destination,
          source,
        },
      };
      swapCardsBatch(batch);
      setActiveBoard(activeBoard);
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
      swapCardsBatch(batch);
      setActiveBoard(activeBoard);
      return;
    }
  };

  /*    Boards Section   */
  const fetchBoard = async (id: string): Promise<IBoardApiData | void> => {
    setFetchingBoard(true);
    const { board } = await getBoard(id);
    if (!board) {
      sendToFirstBoard();
      return;
    }

    setActiveBoard(board);
    setFetchingBoard(false);
    return;
  };

  const createNewBoard = async (name: string): Promise<IBoardApiData> => {
    const request = await createBoard(name);
    const { board } = request;
    if (board) setUserBoards((boards) => [...boards, board]);
    setActiveBoard(board);

    return request;
  };
  const updateBoardsName = async (id: string, name: string, setSubmitting: (isSubmitting: boolean) => void) => {
    const { board } = await updateBoard(id, name);
    const clonedUserBoards = userBoards.slice();
    const updatedBoardIndex = userBoards.findIndex((board) => board._id === activeBoard._id);
    clonedUserBoards[updatedBoardIndex] = board;
    setSubmitting(false);
    setActiveBoard(board);
    setUserBoards(clonedUserBoards);
    return board;
  };

  const removeBoard = async (id: string) => {
    const remainingBoards = await deleteBoard(id);
    setUserBoards(remainingBoards);
    //show first board if we deleted the activeBoard
    if (activeBoard._id === id && remainingBoards.length > 0) setActiveBoard(remainingBoards[0]);
    else if (remainingBoards.length < 1) history.push('/newboard');
    return;
  };

  const updateActiveCard = async (data: ICardUpdateData) => {
    if (focusedCard) {
      const { board } = await updateCard(activeBoard._id, focusedCard.columnId, focusedCard._id, data);
      setActiveBoard(board);
    }
    return;
  };

  /*    Columns Section   */
  const addColumn = async (side: string, name: string): Promise<IBoard> => {
    const { board } = await createColumn(activeBoard._id, side, name);
    setActiveBoard(board);

    return board;
  };

  const removeColumn = async (columnId: string): Promise<void> => {
    const { board } = await deleteColumn(activeBoard._id, columnId);
    setActiveBoard(board);
  };

  const renameColumn = async (
    columnId: string,
    columnName: string,
    setIsRenaming: Dispatch<SetStateAction<boolean>>,
    setSubmitting: (isSubmitting: boolean) => void,
  ) => {
    const { board } = await updateColumn(activeBoard._id, columnId, columnName);
    setSubmitting(false);
    setIsRenaming(false);
    setActiveBoard(board);
  };

  const getColumnById = (columnId: string): IColumn => {
    const colIndex = activeBoard.columns.findIndex((col) => col._id === columnId);
    if (colIndex > -1) return activeBoard.columns[colIndex];
    return activeBoard.columns[colIndex];
  };
  /*    Cards Section   */
  const addCard = async (title: string, tag: string, columnId: string): Promise<void> => {
    const { board } = await createCard(title, tag, columnId, activeBoard._id);
    setActiveBoard(board);
  };

  const removeCard = async (cardId: string): Promise<void> => {
    const { board } = await deleteCard(activeBoard._id, focusedCard?.columnId, cardId);
    setActiveBoard(board);
  };

  const moveCard = async (destination: IColumn): Promise<void> => {
    if (!focusedCard) {
      updateSnackBarMessage('No focus card found!', 'error');
      return;
    }
    const { board } = await moveFocusedCard(activeBoard._id, destination._id, focusedCard._id);
    setActiveBoard(board);
    resetOpenCard();
  };
  const copyCard = async (destination: IColumn): Promise<void> => {
    if (!focusedCard) {
      updateSnackBarMessage('No focus card found!', 'error');
      return;
    }
    const { board } = await copyFocusedCard(activeBoard._id, destination._id, focusedCard._id);
    setActiveBoard(board);
    resetOpenCard();
  };

  const setOpenCard = (card: ICard): void => setFocusedCard(card);
  const resetOpenCard = (): void => setFocusedCard({} as ICard);
  return (
    <KanbanContext.Provider
      value={{
        fetchingBoard,
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
