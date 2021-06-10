import { IFetchOptions, IBoard } from '../../interface';

const createCard = async (title: string, tag: string, columnId: string): Promise<IBoard> => {
  const fetchOptions: IFetchOptions = {
    method: 'POST',
    body: JSON.stringify({ title, tag }),
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  };
  return await fetch(`/columns/${columnId}/addCard`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export default createCard;
