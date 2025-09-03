import z from 'zod';
import { schema } from './schema';

export type TParams = z.infer<typeof schema>;

export interface ICreateTapNotFoundResponse {
  status: 'not-found';
}

export interface ICreateTapCreatedResponse {
  status: 'created';
}
