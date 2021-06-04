import { IFetchOptions, NewColumnApiData } from '../../interface';

const createColumn = async (name: string): Promise<NewColumnApiData> => {
  const fetchOptions: IFetchOptions = {
    method: 'POST',
    body: JSON.stringify({ name }),
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  };
  return await fetch(`/columns`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export default createColumn;
