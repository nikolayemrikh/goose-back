import { withRequiredAuth } from '../../core/withRequiredAuth';
import * as gameService from '../../services/game';
import { ICreateTapCreatedResponse, ICreateTapNotFoundResponse, TParams } from './types';

export const createTap = withRequiredAuth(async function ({
  gameId,
}: TParams): Promise<ICreateTapNotFoundResponse | ICreateTapCreatedResponse> {
  return gameService.createTap(gameId, this.user.id);
});
