import { IFetchOptions, IAuthApiData } from '../../interface/';

const logout = async (): Promise<IAuthApiData> => {
  const fetchOptions: IFetchOptions = {
    method: 'GET',
    credentials: 'include',
  };
  return await fetch(`/auth/logout`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export default logout;
