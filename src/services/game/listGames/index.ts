import { prisma } from '../../../prisma';

export const listGames = async () => {
  return await prisma.game.findMany();
};
