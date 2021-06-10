import { DraggableLocation } from 'react-beautiful-dnd';
import { Batch } from '../../hooks/useBatchUpdater';
import { IFetchOptions } from '../../interface';

const swapCardsOutsideColumn = async (
  batch: Array<
    Batch<{
      name: string;
      source: DraggableLocation;
      destination: DraggableLocation;
    }>
  >,
): Promise<{ message: string }> => {
  const fetchOptions: IFetchOptions = {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(batch),
  };

  return await fetch(`columns/batch/swapCardsOutsideColumn`, fetchOptions)
    .then((res) => res.json())
    .catch((err) => ({
      error: { error: err, message: 'Unable to connect to server. Please try again' },
    }));
};

export default swapCardsOutsideColumn;
