import { IFetchOptions, IBoardApiData } from '../../interface';

const createColumn = async (boardId: string, side: string, name: string): Promise<IBoardApiData> => {
  const fetchOptions: IFetchOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ side, name }),
  };
  return await fetch(`${boardId}/columns/`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export default createColumn;
