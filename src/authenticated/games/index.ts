import { withRequiredAuth } from '../../core/withRequiredAuth';
import * as gameService from '../../services/game';
import { enrichGameEntity } from '../../services/game/enrichGameEntity';
import { IGamesResponse, TParams } from './types';

export const games = withRequiredAuth(async function (params: TParams): Promise<IGamesResponse> {
  const games = await gameService.listGames(params);

  return {
    games: games.map((game) => {
      const enrichedGame = enrichGameEntity(game);
      return {
        ...enrichedGame,
        endAt: enrichedGame.endAt.toISOString(),
        createdAt: enrichedGame.createdAt.toISOString(),
        startAt: enrichedGame.startAt.toISOString(),
      };
    }),
  };
});
