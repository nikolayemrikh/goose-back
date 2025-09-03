import { withRequiredAuth } from '../../core/withRequiredAuth';
import { prisma } from '../../prisma';
import { calculateGameEndAt } from '../../services/game/calculateGameEndAt';
import { calculateStatus } from '../../services/game/calculateStatus';
import { IGamesResponse } from './types';

export const games = withRequiredAuth(async function (): Promise<IGamesResponse> {
  const games = await prisma.game.findMany();

  return {
    games: games.map((game) => {
      return {
        ...game,
        status: calculateStatus(game.startAt),
        endAt: calculateGameEndAt(game.startAt).toISOString(),
        createdAt: game.createdAt.toISOString(),
        startAt: game.startAt.toISOString(),
      };
    }),
  };
});
