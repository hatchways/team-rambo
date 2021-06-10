import { IFetchOptions, IBoard } from '../../interface';

const copyFocusedCard = async (columnId: string, cardId: string): Promise<IBoard> => {
  const fetchOptions: IFetchOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ columnId }),
  };
  return await fetch(`/cards/${cardId}/copyCard`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export default copyFocusedCard;
