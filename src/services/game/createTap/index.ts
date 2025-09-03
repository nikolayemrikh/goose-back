import { prisma } from '../../../prisma';
import { TCreateTapResult } from './types';

export const createTap = async (gameId: string, userId: string): Promise<TCreateTapResult> => {
  const game = await prisma.game.findUnique({
    where: {
      id: gameId,
    },
  });

  if (!game) {
    return {
      status: 'not-found',
    };
  }

  await prisma.gameTap.create({
    data: { gameId: game.id, userId },
  });
  return {
    status: 'created',
  };
};
