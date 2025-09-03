export interface ICreateTapNotFoundResult {
  status: 'not-found';
}

export interface ICreateTapCreatedResult {
  status: 'created';
}

export type TCreateTapResult = ICreateTapNotFoundResult | ICreateTapCreatedResult;
