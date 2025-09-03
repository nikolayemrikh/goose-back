import { prisma } from '../../../prisma';

export const listGames = async (params?: {
  orderBy?: {
    startAt?: 'asc' | 'desc';
  };
}) => {
  return await prisma.game.findMany({
    orderBy: { startAt: params?.orderBy?.startAt },
  });
};
