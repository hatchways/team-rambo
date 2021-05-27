import { FetchOptions } from '../../interface/FetchOptions';
import { IBoard } from '../../interface/Board';

const createBoard = async (name: string): Promise<IBoard> => {
  const fetchOptions: FetchOptions = {
    method: 'POST',
    body: JSON.stringify({ name }),
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  };
  return fetch(`/users/board`, fetchOptions)
    .then((res) => res.json())
    .catch((err) => ({
      error: { error: err, message: 'Unable to connect to server. Please try again' },
    }));
};

export default createBoard;
