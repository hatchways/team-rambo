import { IFetchOptions, IBoard } from '../../interface';

const moveFocusedCard = async (columnId: string, cardId: string): Promise<IBoard> => {
  const fetchOptions: IFetchOptions = {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ columnId }),
  };
  return await fetch(`/cards/${cardId}/moveCard`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export default moveFocusedCard;
