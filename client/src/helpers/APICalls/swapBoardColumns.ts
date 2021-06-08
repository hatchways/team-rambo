import { DraggableLocation } from 'react-beautiful-dnd';
import { IBoard, IFetchOptions } from '../../interface';

const swapBoardColumns = async (
  boardId: string,
  column1: DraggableLocation,
  column2: DraggableLocation,
): Promise<IBoard> => {
  const fetchOptions: IFetchOptions = {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ column1, column2 }),
  };
  return await fetch(`boards/${boardId}/swapColumns`, fetchOptions)
    .then((res) => res.json())
    .catch((err) => ({
      error: { error: err, message: 'Unable to connect to server. Please try again' },
    }));
};

export default swapBoardColumns;
