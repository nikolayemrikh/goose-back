import { withRequiredAuth } from '../../core/withRequiredAuth';
import * as gameService from '../../services/game';
import { schema } from './schema';
import { IGameSummaryResponse, TParams } from './types';

export const gameSummary = withRequiredAuth(async function (params: TParams): Promise<IGameSummaryResponse> {
  const { gameId } = await schema.parseAsync(params);
  const summary = await gameService.getGameSummary(gameId);
  return summary;
});
