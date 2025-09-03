import { auth } from '../../../auth';
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

  const increaseCounterPermission = await auth.api.userHasPermission({
    body: {
      userId,
      permissions: {
        goose: ['tap-increase-counter'],
      },
    },
  });

  await prisma.gameTap.create({
    data: { gameId: game.id, userId, countable: increaseCounterPermission.success },
  });
  return {
    status: 'created',
  };
};
