import { prisma } from '../../../prisma';
import { calculateScore } from '../utils/calculateScore';

export const getScore = async (gameId: string, userId: string) => {
  const tapsCount = await prisma.gameTap.count({ where: { gameId, userId, countable: true } });
  return calculateScore(tapsCount);
};
