import { prisma } from '../../../prisma';
import { getScore } from '../getScore';

export const getGameSummary = async (gameId: string) => {
  const userTaps = await prisma.gameTap.findMany({ where: { gameId }, distinct: 'userId', include: { user: true } });
  const userScores = (
    await Promise.all(
      userTaps.map(async (tap) => {
        const score = await getScore(gameId, tap.userId);
        return {
          user: tap.user,
          score,
        };
      })
    )
  ).sort((a, b) => b.score - a.score);

  const totalScore = userScores.reduce((score, userScore) => {
    score += userScore.score;
    return score;
  }, 0);

  const winnerUserScore = userScores[0];

  return {
    totalScore,
    winnerUsername: winnerUserScore?.user.name ?? null,
  };
};
