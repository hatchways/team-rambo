import { IBoard } from '../../context/types/kanban';
import { FetchOptions } from '../../interface/FetchOptions';

const createBoard = async (): Promise<IBoard> => {
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
