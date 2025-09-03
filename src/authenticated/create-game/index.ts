import { withRequiredAuth } from '../../core/withRequiredAuth';
import * as gameService from '../../services/game';
import { ICreateGameResponse } from './types';

export const createGame = withRequiredAuth(async function (): Promise<ICreateGameResponse> {
  const game = await gameService.createGame(this.user.id);
  return {
    id: game.id,
  };
});
