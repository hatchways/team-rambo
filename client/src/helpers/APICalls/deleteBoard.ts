import { IFetchOptions, IBoard } from '../../interface';

const deleteBoard = async (board: IBoard): Promise<IBoard> => {
  const fetchOptions: IFetchOptions = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(board),
  };
  return await fetch(`boards/${board._id}`, fetchOptions)
    .then((res) => res.json())
    .catch((err) => ({
      error: { error: err, message: 'Unable to connect to server. Please try again' },
    }));
};

export default deleteBoard;
