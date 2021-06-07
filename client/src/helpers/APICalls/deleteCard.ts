import { IFetchOptions, IBoard } from '../../interface';

const deleteCard = async (cardId: string): Promise<IBoard> => {
  const fetchOptions: IFetchOptions = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ cardId }),
  };
  return await fetch(`cards/${cardId}`, fetchOptions)
    .then((res) => res.json())
    .catch((err) => ({
      error: { error: err, message: 'Unable to connect to server. Please try again' },
    }));
};

export default deleteCard;
