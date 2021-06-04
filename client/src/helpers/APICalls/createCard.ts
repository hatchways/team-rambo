import { IFetchOptions, NewCardApiData } from '../../interface';

const createCard = async (name: string, tag: string, columnId: string): Promise<NewCardApiData> => {
  const fetchOptions: IFetchOptions = {
    method: 'POST',
    body: JSON.stringify({ name, tag, columnId }),
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  };
  return await fetch(`/cards`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export default createCard;
