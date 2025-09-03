import { createGame } from './authenticated/create-game';
import { createTap } from './authenticated/create-tap';
import { game } from './authenticated/game';
import { gameSummary } from './authenticated/game-summary';
import { games } from './authenticated/games';
import { ownScore } from './authenticated/own-score';

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
type TMethod = (...args: any[]) => Promise<any>;

interface IMethods {
  [key: string]: TMethod | IMethods;
}

export const rpcMethods = {
  authenticated: {
    game,
    games,
    ownScore,
    gameSummary,
    createGame,
    createTap,
  } satisfies Record<string, TMethod>,
} satisfies IMethods;

export type RpcMethods = typeof rpcMethods;
