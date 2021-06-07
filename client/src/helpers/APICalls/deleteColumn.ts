import { IFetchOptions, IBoard, IColumn } from '../../interface';

const deleteColumn = async (column: IColumn): Promise<IBoard> => {
  const fetchOptions: IFetchOptions = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(column),
  };
  return await fetch(`columns/${column._id}`, fetchOptions)
    .then((res) => res.json())
    .catch((err) => ({
      error: { error: err, message: 'Unable to connect to server. Please try again' },
    }));
};

export default deleteColumn;
