import { IFetchOptions, IBoardApiData } from '../../interface';

const copyFocusedCard = async (boardId: string, columnId: string, cardId: string): Promise<IBoardApiData> => {
  const fetchOptions: IFetchOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ columnId }),
  };
  return await fetch(`${boardId}/columns/${columnId}/cards/${cardId}/copyCard`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export default copyFocusedCard;
