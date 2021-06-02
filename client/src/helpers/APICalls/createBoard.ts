import { IFetchOptions, NewBoardApiData } from '../../interface/';

const createBoard = async (name: string): Promise<NewBoardApiData> => {
  const fetchOptions: IFetchOptions = {
    method: 'POST',
    body: JSON.stringify({ name }),
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  };
  return await fetch(`/boards`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export default createBoard;
