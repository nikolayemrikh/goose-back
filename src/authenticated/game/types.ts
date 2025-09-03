import z from 'zod';
import { EGameStatus } from '../../services/game/utils/calculateStatus/enums';
import { schema } from './schema';

export type TParams = z.infer<typeof schema>;

export interface IGame {
  id: string;
  createdAt: string;
  ownerUserId: string;
  startAt: string;
  endAt: string;
  status: EGameStatus;
}

export interface IGameFoundResponse {
  game: IGame;
  status: 'found';
}

export interface IGameNotFoundResponse {
  status: 'not-found';
}

export type TGameResponse = IGameFoundResponse | IGameNotFoundResponse;
