export interface IAuthenticatedResult<T> {
  status: 'authorized';
  data: T;
}

export interface IUnauthenticatedResult {
  status: 'unauthorized';
}
