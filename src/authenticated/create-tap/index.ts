import { auth } from '../../auth';
import { withRequiredAuth } from '../../core/withRequiredAuth';
import * as gameService from '../../services/game';
import { ICreateTapCreatedResponse, ICreateTapNotFoundResponse, TParams } from './types';

export const createTap = withRequiredAuth(async function ({
  gameId,
}: TParams): Promise<ICreateTapNotFoundResponse | ICreateTapCreatedResponse> {
  const permissionRes = await auth.api.userHasPermission({
    body: {
      userId: this.user.id,
      permissions: {
        goose: ['tap-increase-counter'],
      },
    },
  });

  console.log(permissionRes);

  return gameService.createTap(gameId, this.user.id);
});
