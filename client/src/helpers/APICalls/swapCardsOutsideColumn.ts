import { DraggableLocation } from 'react-beautiful-dnd';
import { IBoard, IFetchOptions } from '../../interface';

const swapCardsOutsideColumn = async (
  cardId: string,
  source: DraggableLocation,
  destination: DraggableLocation,
): Promise<IBoard> => {
  const fetchOptions: IFetchOptions = {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ cardId, source, destination }),
  };

  return await fetch(`columns/${source.droppableId}/swapCardsOutsideColumn`, fetchOptions)
    .then((res) => res.json())
    .catch((err) => ({
      error: { error: err, message: 'Unable to connect to server. Please try again' },
    }));
};

export default swapCardsOutsideColumn;
