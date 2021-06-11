import { IRequest } from './types';
import { IFetchOptions } from '../../../interface';

const request = async <T>(data: IRequest<T>): Promise<any> => {
  const fetchOptions: IFetchOptions = {
    method: data.method,
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  };
  if (data.method !== 'GET') fetchOptions.body = JSON.stringify(data.body);
  return fetch(data.route, fetchOptions)
    .then((res) => res.json())
    .catch((err) => {
      console.log(err);
      return { error: 'Working on better errors' };
    });
};

export default request;
