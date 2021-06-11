import { IFetchOptions, IBoardApiData } from '../../interface';

const deleteCard = async (boardId: string, columnId: string, cardId: string): Promise<IBoardApiData> => {
  const fetchOptions: IFetchOptions = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  };
  return await fetch(`${boardId}/columns/${columnId}/cards/${cardId}`, fetchOptions)
    .then((res) => res.json())
    .catch((err) => ({
      error: { error: err, message: 'Unable to connect to server. Please try again' },
    }));
};

export default deleteCard;
