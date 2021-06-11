import { IBoardApiData, IColumn, IFetchOptions } from '../../interface';

const updateBoardColumns = async (boardId: string, columns: IColumn): Promise<IBoardApiData> => {
  const fetchOptions: IFetchOptions = {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(columns),
  };
  return await fetch(`boards/${boardId}/updateColumns`, fetchOptions)
    .then((res) => res.json())
    .catch((err) => ({
      error: { error: err, message: 'Unable to connect to server. Please try again' },
    }));
};

export default updateBoardColumns;
