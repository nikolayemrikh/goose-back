import { BONUS_SCORE, BONUS_TAPS_PERIOD } from '../../constants';

export const calculateScore = (tapsCount: number): number => {
  const bonusTimesCount = Math.floor(tapsCount / BONUS_TAPS_PERIOD);
  return tapsCount - bonusTimesCount + bonusTimesCount * BONUS_SCORE;
};
