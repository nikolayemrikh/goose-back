import { withRequiredAuth } from '../../core/withRequiredAuth';
import { prisma } from '../../prisma';
import { ICreateTapCreatedResponse, ICreateTapNotFoundResponse, TParams } from './types';

export const createTap = withRequiredAuth(async function ({
  gameId,
}: TParams): Promise<ICreateTapNotFoundResponse | ICreateTapCreatedResponse> {
  const game = await prisma.game.findUnique({
    where: {
      id: gameId,
    },
  });

  if (!game) {
    return {
      status: 'not-found',
    };
  }

  await prisma.gameTap.create({
    data: { gameId: game.id, userId: this.user.id },
  });
  return {
    status: 'created',
  };
});
