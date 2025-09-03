import { prisma } from '../../../prisma';
import { calculateScore } from '../utils/calculateScore';

export const getGameSummary = async (gameId: string) => {
  const userTaps = await prisma.gameTap.groupBy({
    by: ['userId'],
    where: { gameId, countable: true },
    _count: { _all: true },
  });

  const userScores = userTaps
    .map((tap) => {
      const score = calculateScore(tap._count._all);
      return {
        userId: tap.userId,
        score,
      };
    })
    .sort((a, b) => b.score - a.score);

  const totalScore = userScores.reduce((score, userScore) => {
    score += userScore.score;
    return score;
  }, 0);

  const winnerUserScore = userScores[0];

  const winnerUser = winnerUserScore
    ? await prisma.user.findFirst({
        where: { id: winnerUserScore?.userId },
      })
    : null;

  return {
    totalScore,
    winnerUsername: winnerUser?.name ?? null,
  };
};
