import { withRequiredAuth } from '../../core/withRequiredAuth';
import * as gameService from '../../services/game';
import { IGameSummaryResponse, TParams } from './types';

export const gameSummary = withRequiredAuth(async function ({ gameId }: TParams): Promise<IGameSummaryResponse> {
  const summary = await gameService.getGameSummary(gameId);
  return summary;
});
