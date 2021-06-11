import { IFetchOptions, IBoardApiData } from '../../interface';

const updateColumn = async (boardId: string, columnId: string, name: string): Promise<IBoardApiData> => {
  const fetchOptions: IFetchOptions = {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ name }),
  };
  return await fetch(`${boardId}/columns/${columnId}`, fetchOptions)
    .then((res) => res.json())
    .catch((err) => ({
      error: { error: err, message: 'Unable to connect to server. Please try again' },
    }));
};

export default updateColumn;
