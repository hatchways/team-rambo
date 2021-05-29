import { IBoard } from '../../interface/Board';
import { FetchOptions } from '../../interface/FetchOptions';

export const updateBoard = async (board: IBoard): Promise<IBoard> => {
  const fetchOptions: FetchOptions = {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(board),
  };
  return await fetch(`boards/${board._id}`, fetchOptions)
    .then((res) => res.json())
    .catch((err) => ({
      error: { error: err, message: 'Unable to connect to server. Please try again' },
    }));
};