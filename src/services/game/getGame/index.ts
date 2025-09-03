import { prisma } from '../../../prisma';

export const getGame = async (id: string) => {
  return prisma.game.findUnique({ where: { id } });
};
