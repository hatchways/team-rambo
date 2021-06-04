import { useState, useContext, createContext, FunctionComponent, useEffect, Dispatch, SetStateAction } from 'react';
import { DraggableLocation, DropResult } from 'react-beautiful-dnd';
import cloneDeep from 'lodash.clonedeep';
import { v4 as uuidv4 } from 'uuid';
import { getBoard, getUserBoards, updateBoard, createBoard, createCard, createColumn } from '../helpers/';
import { useSnackBar, useAuth } from './';
import {
  IKanbanContext,
  IColumn,
  ICard,
  IBoard,
  NewBoardApiData,
  NewCardApiData,
  NewColumnApiData,
} from '../interface/';

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
  const [columns, setColumns] = useState<IColumn[]>(activeBoard.columns);
  const [focusedCard, setFocusedCard] = useState<ICard | null>(null);
  const { updateSnackBarMessage } = useSnackBar();
  const { loggedInUser } = useAuth();

  useEffect(() => {
    if (loggedInUser) getFirstBoard();

    return;
  }, [loggedInUser]);

  const createNewCard = async (name: string, tag: string, columnId: string): Promise<NewCardApiData> => {
    const request = await createCard(name, tag, columnId);
    const card = request.card;
    if (card) addCard(card);

    return request;
  };

  const createNewColumn = async (name: string): Promise<NewColumnApiData> => {
    const request = await createColumn(name);
    const column = request.column;
    if (column) addColumn(column.name, 'left');
    console.log(column);
    return request;
  };

  const getFirstBoard = async (): Promise<IBoard> => {
    const request = await getUserBoards();
    const board = request.boards[0];
    setActiveBoard(board);
    setUserBoards(request.boards);
    setColumns(board.columns);

    return board;
  };

  const fetchBoard = async (id: string): Promise<IBoard> => {
    const board = await getBoard(id);
    setActiveBoard(board);
    setColumns(board.columns);

    return board;
  };

  const createNewBoard = async (name: string): Promise<NewBoardApiData> => {
    const request = await createBoard(name);
    if (request.board) setUserBoards((boards) => [...boards, request.board]);

    return request;
  };

  const handleDragEnd = (result: DropResult): void => {
    if (!result.destination) return;

    const { destination, source, draggableId, type } = result;

    const dupBoard = Object.assign({}, activeBoard);
    const columnsCopy: IColumn[] = cloneDeep(columns);
    const colIndex = columns.findIndex((col) => col._id === source.droppableId);

    if (type === 'column') {
      // reorder the column.
      const reorderedColumns = swapColumns(columnsCopy, source, destination);
      dupBoard.columns = reorderedColumns;

      updateBoard(dupBoard);

      setActiveBoard(dupBoard);

      setColumns(reorderedColumns);

      return;
    }

    if (source.droppableId === destination.droppableId && colIndex > -1) {
      const cards = Array.from(columnsCopy[colIndex].cards);
      const newCards = swapCards(cards, source, destination, draggableId);
      columnsCopy[colIndex].cards = newCards;
      dupBoard.columns = columnsCopy;

      updateBoard(dupBoard);

      setActiveBoard(dupBoard);
      setColumns(columnsCopy);

      return;
    }

    if (source.droppableId !== destination.droppableId) {
      const targetColumnIndex = columnsCopy.findIndex((col) => col._id === destination.droppableId);
      if (targetColumnIndex > -1) {
        const targetColumn = columnsCopy[targetColumnIndex];
        const originalColumn = columnsCopy[colIndex];
        const [card] = originalColumn.cards.splice(source.index, 1);
        card.columnId = targetColumn._id;
        targetColumn.cards.splice(destination.index, 0, card);
      }
    }

    dupBoard.columns = columnsCopy;

    updateBoard(dupBoard);

    setActiveBoard(dupBoard);
    setColumns(columnsCopy);
  };

  const swapCards = (
    cards: ICard[],
    source: DraggableLocation,
    destination: DraggableLocation,
    draggableId: string,
  ): ICard[] => {
    const cardsCopy = [...cards];
    const cardIndex = cardsCopy.findIndex((card: ICard) => card._id === draggableId);
    if (cardIndex > -1) {
      const [card] = cardsCopy.splice(source.index, 1);
      cardsCopy.splice(destination.index, 0, card);

      return cardsCopy;
    }

    return cards;
  };

  const moveCard = (destination: IColumn): void => {
    if (!focusedCard) {
      updateSnackBarMessage('No focus card found!', 'error');
      return;
    }

    const dupBoard = Object.assign({}, activeBoard);
    const columnsCopy: IColumn[] = cloneDeep(columns);

    const colIndex = columns.findIndex((col) => col._id === focusedCard.columnId);

    if (focusedCard.columnId !== destination._id) {
      const targetColumnIndex = columnsCopy.findIndex((col) => col._id === destination._id);
      if (targetColumnIndex > -1) {
        const targetColumn = columnsCopy[targetColumnIndex];
        const originalColumn = columnsCopy[colIndex];
        const cardIndex = originalColumn.cards.findIndex((card) => card._id === focusedCard._id);
        const [card] = originalColumn.cards.splice(cardIndex, 1);
        card.columnId = targetColumn._id;
        targetColumn.cards.push(card);
      }
    }

    dupBoard.columns = columnsCopy;

    updateBoard(dupBoard);
    setActiveBoard(dupBoard);
    setColumns(columnsCopy);
    resetOpenCard();
  };

  const copyCard = (destination: IColumn): void => {
    if (!focusedCard) {
      updateSnackBarMessage('No focus card found!', 'error');
      return;
    }
    const source = getColumnById(focusedCard?.columnId);
    const dupBoard = Object.assign({}, activeBoard);
    const columnsCopy: IColumn[] = cloneDeep(columns);

    if (source._id !== destination._id) {
      const targetColumnIndex = columnsCopy.findIndex((col) => col._id === destination._id);
      if (targetColumnIndex > -1) {
        const targetColumn = columnsCopy[targetColumnIndex];
        const card = Object.assign({}, focusedCard);
        card._id = uuidv4();
        card.columnId = targetColumn._id;
        targetColumn.cards.push(card);
      }
    } else updateSnackBarMessage("Can't copy card to same column!", 'warning');
    dupBoard.columns = columnsCopy;

    updateBoard(dupBoard);
    setActiveBoard(dupBoard);
    setColumns(columnsCopy);
  };

  const addCard = (card: ICard): boolean => {
    if (card.name === '') {
      updateSnackBarMessage('Please enter a card name');

      return false;
    }

    const columnsCopy = cloneDeep(columns);
    const columnIndex = columnsCopy.findIndex((col) => col._id === card.columnId);
    if (columnIndex > -1) {
      const columnCopy = cloneDeep(columns[columnIndex]);
      columnCopy.cards.push(card);
      columnsCopy[columnIndex] = columnCopy;
      const copyBoard = Object.assign({}, activeBoard);
      copyBoard.columns = columnsCopy;

      updateBoard(copyBoard);
      setActiveBoard(copyBoard);
      setColumns(columnsCopy);

      return true;
    }

    return false;
  };

  const removeActiveCard = (): void => {
    const columnsCopy = cloneDeep(columns);
    const columnIndex = columnsCopy.findIndex((col) => col._id === focusedCard?.columnId);

    if (columnIndex > -1) {
      const columnCopy = cloneDeep(columns[columnIndex]);
      columnCopy.cards = columnCopy.cards.filter((card) => card._id !== focusedCard?._id);
      columnsCopy[columnIndex] = columnCopy;
      const copyBoard = Object.assign({}, activeBoard);
      copyBoard.columns = columnsCopy;

      updateBoard(copyBoard);
      setActiveBoard(copyBoard);
      setColumns(columnsCopy);
      resetOpenCard();
    }
  };

  const swapColumns = (columns: IColumn[], source: DraggableLocation, destination: DraggableLocation): IColumn[] => {
    const [sourceCol] = columns.splice(source.index, 1);
    columns.splice(destination.index, 0, sourceCol);

    return columns;
  };

  const renameColumn = (
    columnId: string,
    name: string,
    setIsRenaming: Dispatch<SetStateAction<boolean>>,
    setSubmitting: (isSubmitting: boolean) => void,
  ): undefined => {
    const colId = columns.findIndex((col) => col._id === columnId);

    if (colId < 0) return undefined;

    const dupColumns = cloneDeep(columns);
    const dupBoard = Object.assign({}, activeBoard);

    dupColumns[colId].name = name;
    dupBoard.columns = dupColumns;

    updateBoard(dupBoard).then(() => {
      setSubmitting(false);
      setIsRenaming((prev) => !prev);
    });

    setActiveBoard(dupBoard);
    setColumns(dupColumns);

    return undefined;
  };

  const removeColumn = (columnId: string): undefined => {
    const colId = columns.findIndex((col) => col._id === columnId);

    if (colId < 0) return undefined;

    const dupBoard = Object.assign({}, activeBoard);
    const dupColumnsArray = dupBoard.columns.slice();
    const newColumns = dupColumnsArray.slice(0, colId).concat(dupColumnsArray.slice(colId + 1));
    dupBoard.columns = newColumns;

    updateBoard(dupBoard);
    setActiveBoard(dupBoard);
    setColumns(newColumns);

    return undefined;
  };

  const addColumn = (columnName: string, side: string): void => {
    const blankColumn: IColumn = {
      _id: uuidv4(),
      name: columnName,
      cards: [],
      createdAt: new Date(),
    };
    const dupBoard = Object.assign({}, activeBoard);
    const dupColumnsArray = dupBoard.columns.slice();
    side === 'right' ? dupColumnsArray.push(blankColumn) : dupColumnsArray.unshift(blankColumn);
    dupBoard.columns = dupColumnsArray;

    updateBoard(dupBoard);
    setActiveBoard(dupBoard);
    setColumns(dupColumnsArray);
  };

  const setOpenCard = (card: ICard): void => setFocusedCard(card);

  const resetOpenCard = (): void => setFocusedCard(null);

  const getColumnById = (columnId: string): IColumn => {
    const colIndex = columns.findIndex((col) => col._id === columnId);
    if (colIndex > -1) return columns[colIndex];
    return activeBoard.columns[0];
  };

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
        removeActiveCard,
        addColumn,
        createNewCard,
        createNewColumn,
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
