import { IFetchOptions, IBoard } from '../../interface';

const updateColumnName = async (columnId: string, columnName: string): Promise<IBoard> => {
  const fetchOptions: IFetchOptions = {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ columnName }),
  };
  return await fetch(`columns/${columnId}/rename`, fetchOptions)
    .then((res) => res.json())
    .catch((err) => ({
      error: { error: err, message: 'Unable to connect to server. Please try again' },
    }));
};

export default updateColumnName;
