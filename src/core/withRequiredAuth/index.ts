import { IAppEnvs } from '@/types';
import { Context } from 'hono';
import { BlankInput } from 'hono/types';
import { auth } from '../../auth';
import { IAuthenticatedResult, IUnauthenticatedResult } from './types';

export const withRequiredAuth = <
  F extends (
    this: { user: NonNullable<IAppEnvs['Variables']['user']>; session: NonNullable<IAppEnvs['Variables']['session']> },
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    ...args: any[]
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  ) => Promise<any>,
>(
  fn: F
) => {
  return async function (
    this: Context<IAppEnvs, '/*', BlankInput>,
    ...args: Parameters<F>
  ): Promise<IAuthenticatedResult<Awaited<ReturnType<F>>> | IUnauthenticatedResult> {
    const session = await auth.api.getSession({ headers: this.req.raw.headers });

    if (session) {
      return {
        status: 'authorized',
        data: await fn.apply({ session: session.session, user: session.user }, args),
      };
    }
    return {
      status: 'unauthorized',
    };
  };
};
