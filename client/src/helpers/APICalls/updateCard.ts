import { IFetchOptions, IBoard, ICardUpdateData } from '../../interface';

const updateCard = async (id: string, data: ICardUpdateData): Promise<IBoard> => {
  const fetchOptions: IFetchOptions = {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(data),
  };
  return await fetch(`cards/${id}`, fetchOptions)
    .then((res) => res.json())
    .catch((err) => ({
      error: { error: err, message: 'Unable to connect to server. Please try again' },
    }));
};

export default updateCard;
