import { IFetchOptions, ICard } from '../../interface';

const deleteCard = async (card: ICard): Promise<ICard> => {
  const fetchOptions: IFetchOptions = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(card),
  };
  return await fetch(`cards/${card._id}`, fetchOptions)
    .then((res) => res.json())
    .catch((err) => ({
      error: { error: err, message: 'Unable to connect to server. Please try again' },
    }));
};

export default deleteCard;
