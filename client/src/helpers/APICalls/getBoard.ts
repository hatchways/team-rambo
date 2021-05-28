import { FetchOptions } from '../../interface/FetchOptions';
import { IBoard } from '../../interface/Board';

const getBoard = async (id: string): Promise<IBoard> => {
  const fetchOptions: FetchOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  };
  return await fetch(`users/board/${id}`, fetchOptions)
    .then((res) => res.json())
    .catch((err) => ({
      error: { error: err, message: 'Unable to connect to server. Please try again' },
    }));
};

export default getBoard;
