import { FetchOptions } from '../../interface/FetchOptions';
import { Board } from '../../interface/Board';

const createBoard = async (): Promise<Board> => {
  const fetchOptions: FetchOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  };
  return await fetch(`/users/board`, fetchOptions)
    .then((res) => res.json())
    .catch((err) => ({
      error: { error: err, message: 'Unable to connect to server. Please try again' },
    }));
};

export default createBoard;
