import { NewBoardApiData } from './../../interface/Board';
import { FetchOptions } from '../../interface/FetchOptions';

const createBoard = async (name: string): Promise<NewBoardApiData> => {
  const fetchOptions: FetchOptions = {
    method: 'POST',
    body: JSON.stringify({ name }),
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  };
  return fetch(`/users/board`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export default createBoard;
