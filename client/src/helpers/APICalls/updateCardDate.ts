import { IFetchOptions, IBoardApiData } from '../../interface';

const updateCardDate = async (
  boardId: string,
  columnId: string,
  cardId: string,
  date: string,
): Promise<IBoardApiData> => {
  const fetchOptions: IFetchOptions = {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ date }),
  };

  return await fetch(`${boardId}/columns/${columnId}/cards/${cardId}/updateDate`, fetchOptions)
    .then((res) => res.json())
    .catch((err) => ({
      error: { error: err, message: 'Unable to connect to server. Please try again' },
    }));
};

export default updateCardDate;
