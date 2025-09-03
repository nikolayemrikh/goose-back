import { v4 as uuid } from 'uuid';
import { withRequiredAuth } from '../../core/withRequiredAuth';
import { COOLDOWN_DURATION } from '../../env';
import { prisma } from '../../prisma';
import { ICreateGameResponse } from './types';

export const createGame = withRequiredAuth(async function (): Promise<ICreateGameResponse> {
  const startAt = new Date(Date.now() + Number(COOLDOWN_DURATION) * 1000);

  const id = uuid();
  await prisma.game.create({
    data: { id, ownerUserId: this.user.id, startAt: startAt },
  });
  return {
    id,
  };
});
