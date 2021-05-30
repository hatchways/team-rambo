import { IFetchOptions, IAuthApiData } from '../../interface/';

export const logout = async (): Promise<IAuthApiData> => {
  const fetchOptions: IFetchOptions = {
    method: 'GET',
    credentials: 'include',
  };
  return fetch(`/auth/logout`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};
