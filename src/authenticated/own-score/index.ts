import { withRequiredAuth } from '../../core/withRequiredAuth';
import * as gameService from '../../services/game';
import { IOwnScoreResponse, TParams } from './types';

export const ownScore = withRequiredAuth(async function ({ gameId }: TParams): Promise<IOwnScoreResponse> {
  const score = await gameService.getScore(gameId, this.user.id);
  return { score };
});
