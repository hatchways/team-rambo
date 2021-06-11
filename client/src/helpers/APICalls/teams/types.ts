type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface IRequest<T> {
  route: string;
  method: HTTPMethod;
  body: T;
}

export interface IResponse {}
