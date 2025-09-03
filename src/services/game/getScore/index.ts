import { auth } from '../../../auth';
import { prisma } from '../../../prisma';
import { calculateScore } from '../utils/calculateScore';

export const getScore = async (gameId: string, userId: string) => {
  const tapsCount = await prisma.gameTap.count({ where: { gameId, userId } });
  const increaseCounterPermission = await auth.api.userHasPermission({
    body: {
      userId,
      permissions: {
        goose: ['tap-increase-counter'],
      },
    },
  });

  return increaseCounterPermission.success ? calculateScore(tapsCount) : 0;
};
