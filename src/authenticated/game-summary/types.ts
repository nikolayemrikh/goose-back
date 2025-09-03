import z from 'zod';
import { schema } from './schema';

export type TParams = z.infer<typeof schema>;

export interface IGameSummaryResponse {
  totalScore: number;
  winnerUsername: string | null;
}
