import { IFetchOptions, IBoard } from '../../interface/';

interface BoardApiData {
  boards: Array<IBoard>;
  error?: { message: string };
}

export const getUserBoards = async (): Promise<BoardApiData> => {
  const fetchOptions: IFetchOptions = {
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
