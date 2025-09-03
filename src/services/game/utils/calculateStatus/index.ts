import { calculateGameEndAt } from '../calculateGameEndAt';
import { EGameStatus } from './enums';

export const calculateStatus = (gameStartAt: Date): EGameStatus => {
  const currentTime = Date.now();
  const gameEndAt = calculateGameEndAt(gameStartAt);
  if (currentTime > gameStartAt.getTime()) {
    if (currentTime > gameEndAt.getTime()) return EGameStatus.Completed;
    return EGameStatus.InProgress;
  }
  return EGameStatus.Cooldown;
};
