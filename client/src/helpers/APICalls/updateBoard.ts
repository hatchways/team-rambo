import { IBoardApiData, IFetchOptions } from '../../interface/';

const updateBoard = async (id: string, name: string): Promise<IBoardApiData> => {
  const fetchOptions: IFetchOptions = {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ name }),
  };
  return await fetch(`${id}`, fetchOptions)
    .then((res) => res.json())
    .catch((err) => ({
      error: { error: err, message: 'Unable to connect to server. Please try again' },
    }));
};

export default updateBoard;
