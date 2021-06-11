import { IFetchOptions, IBoardApiData } from '../../interface';

const deleteColumn = async (boardId: string, columnId: string): Promise<IBoardApiData> => {
  const fetchOptions: IFetchOptions = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ columnId }),
  };
  return await fetch(`${boardId}/columns/${columnId}`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export default deleteColumn;
