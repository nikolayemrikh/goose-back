import { calculateGameEndAt } from '../calculateGameEndAt';
import { calculateStatus } from '../calculateStatus';
import { IGame, IGameEnriched } from './types';

export const enrichGameEntity = (game: IGame): IGameEnriched => {
  return {
    ...game,
    status: calculateStatus(game.startAt),
    endAt: calculateGameEndAt(game.startAt),
  };
};
