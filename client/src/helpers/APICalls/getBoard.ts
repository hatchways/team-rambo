import { IFetchOptions, IBoard } from '../../interface/';

const getBoard = async (id: string): Promise<IBoard> => {
  const fetchOptions: IFetchOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  };
  return fetch(`/boards/${id}`, fetchOptions)
    .then((res) => res.json())
    .catch((err) => ({
      error: { error: err, message: 'Unable to connect to server. Please try again' },
    }));
};

export default getBoard;
