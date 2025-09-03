import { withRequiredAuth } from '../../core/withRequiredAuth';
import * as gameService from '../../services/game';
import { schema } from './schema';
import { TGameResponse, TParams } from './types';

export const game = withRequiredAuth(async function (params: TParams): Promise<TGameResponse> {
  const { gameId } = await schema.parseAsync(params);
  const game = await gameService.getGame(gameId);
  if (game) {
    const enrichedGame = gameService.enrichGameEntity(game);
    return {
      status: 'found',
      game: {
        ...enrichedGame,
        endAt: enrichedGame.endAt.toISOString(),
        createdAt: enrichedGame.createdAt.toISOString(),
        startAt: enrichedGame.startAt.toISOString(),
      },
    };
  }

  return {
    status: 'not-found',
  };
});
