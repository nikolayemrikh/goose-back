import { calculateGameEndAt } from '../utils/calculateGameEndAt';
import { calculateStatus } from '../utils/calculateStatus';
import { IGame, IGameEnriched } from './types';

export const enrichGameEntity = (game: IGame): IGameEnriched => {
  return {
    ...game,
    status: calculateStatus(game.startAt),
    endAt: calculateGameEndAt(game.startAt),
  };
};
