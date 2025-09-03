import { withRequiredAuth } from '../../core/withRequiredAuth';
import * as gameService from '../../services/game';
import { schema } from './schema';
import { ICreateTapCreatedResponse, ICreateTapNotFoundResponse, TParams } from './types';

export const createTap = withRequiredAuth(async function (
  params: TParams
): Promise<ICreateTapNotFoundResponse | ICreateTapCreatedResponse> {
  const { gameId } = await schema.parseAsync(params);

  return gameService.createTap(gameId, this.user.id);
});
