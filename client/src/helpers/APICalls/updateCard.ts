import { IFetchOptions, IBoardApiData, ICardUpdateData } from '../../interface';

const updateCard = async (
  boardId: string,
  columnId: string,
  cardId: string,
  data: ICardUpdateData,
): Promise<IBoardApiData> => {
  const fetchOptions: IFetchOptions = {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(data),
  };
  return await fetch(`${boardId}/columns/${columnId}/cards/${cardId}`, fetchOptions)
    .then((res) => res.json())
    .catch((err) => ({
      error: { error: err, message: 'Unable to connect to server. Please try again' },
    }));
};

export default updateCard;
