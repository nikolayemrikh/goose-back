import { ROUND_DURATION } from '../../../../env';

export const calculateGameEndAt = (gameStartAt: Date): Date => {
  return new Date(gameStartAt.getTime() + Number(ROUND_DURATION) * 1000);
};
