import { ISearchUsersApiData, IFetchOptions } from '../../interface/';

interface Props {
  search: string;
}

// Why does the search need to be deconstructed? Is this from starting code?
export const searchUsers = async ({ search }: Props): Promise<ISearchUsersApiData> => {
  const fetchOptions: IFetchOptions = {
    method: 'GET',
    credentials: 'include',
  };
  return await fetch(`/users?search=${search}`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};
