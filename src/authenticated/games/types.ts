import { EGameStatus } from '../../services/game/calculateStatus/enums';

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
