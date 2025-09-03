import { v4 as uuid } from 'uuid';
import { COOLDOWN_DURATION } from '../../../env';
import { prisma } from '../../../prisma';

export const createGame = async (ownerUserId: string) => {
  const startAt = new Date(Date.now() + Number(COOLDOWN_DURATION) * 1000);

  const id = uuid();
  return prisma.game.create({
    data: { id, ownerUserId, startAt: startAt },
  });
};
