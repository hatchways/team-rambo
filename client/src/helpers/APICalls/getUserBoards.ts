import { FetchOptions } from '../../interface/FetchOptions';
import { IBoard } from '../../context/types/kanban';

interface BoardApiData {
  boards: Array<IBoard>;
  error?: { message: string };
}

const getUserBoards = async (): Promise<BoardApiData> => {
  const fetchOptions: FetchOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  };
  return fetch(`/users/board`, fetchOptions)
    .then((res) => res.json())
    .catch((err) => ({
      error: { error: err, message: 'Unable to connect to server. Please try again' },
    }));
};

export default getUserBoards;
