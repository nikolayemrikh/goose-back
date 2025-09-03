import { withRequiredAuth } from '../../core/withRequiredAuth';
import * as gameService from '../../services/game';
import { schema } from './schema';
import { IOwnScoreResponse, TParams } from './types';

export const ownScore = withRequiredAuth(async function (params: TParams): Promise<IOwnScoreResponse> {
  const { gameId } = await schema.parseAsync(params);
  const score = await gameService.getScore(gameId, this.user.id);
  return { score };
});
