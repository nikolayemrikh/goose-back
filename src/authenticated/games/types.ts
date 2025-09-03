import z from 'zod';
import { EGameStatus } from '../../services/game/utils/calculateStatus/enums';
import { schema } from './schema';

export interface IGame {
  id: string;
  createdAt: string;
  ownerUserId: string;
  startAt: string;
  endAt: string;
  status: EGameStatus;
}

export interface IGamesResponse {
  games: IGame[];
}

export type TParams = z.infer<typeof schema>;
