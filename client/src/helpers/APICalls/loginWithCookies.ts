import { IFetchOptions, IAuthApiData } from '../../interface/';

export const loginWithCookies = async (): Promise<IAuthApiData> => {
  const fetchOptions: IFetchOptions = {
    method: 'GET',
    credentials: 'include',
  };
  return fetch(`/auth/user`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};
