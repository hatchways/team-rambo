import { IFetchOptions, IBoard } from '../../interface';

const deleteBoard = async (boardId: string): Promise<IBoard> => {
  const fetchOptions: IFetchOptions = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ boardId }),
  };
  return await fetch(`boards/${boardId}`, fetchOptions)
    .then((res) => res.json())
    .catch((err) => ({
      error: { error: err, message: 'Unable to connect to server. Please try again' },
    }));
};

export default deleteBoard;
