import { IFetchOptions, IBoard } from '../../interface';

const createColumn = async (boardId: string, side: string, name: string): Promise<IBoard> => {
  const fetchOptions: IFetchOptions = {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ side, name }),
  };
  return await fetch(`/boards/${boardId}/addColumn`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export default createColumn;
