import { IFetchOptions, IBoardApiData } from '../../interface/';

const getBoard = async (id: string): Promise<IBoardApiData> => {
  const fetchOptions: IFetchOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  };
  return await fetch(`${id}`, fetchOptions)
    .then((res) => res.json())
    .catch((err) => ({
      error: { error: err, message: 'Unable to connect to server. Please try again' },
    }));
};

export default getBoard;
