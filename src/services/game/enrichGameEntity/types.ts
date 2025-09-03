import { EGameStatus } from '../calculateStatus/enums';

export interface IGame {
  id: string;
  ownerUserId: string;
  createdAt: Date;
  startAt: Date;
}

export interface IGameEnriched {
  id: string;
  ownerUserId: string;
  createdAt: Date;
  startAt: Date;
  endAt: Date;
  status: EGameStatus;
}
