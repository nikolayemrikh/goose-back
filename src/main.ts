import 'dotenv/config';
// validate all env vars set
import './env';
import { resolve } from 'node:path';
import { serve } from '@hono/node-server';
import { createRPCServer } from '@nikolayemrikh/rpc-ts-server';
import { TMethod } from '@nikolayemrikh/rpc-ts-server/dist/createRPCServer/types';
import { Context, Hono } from 'hono';
import { cors } from 'hono/cors';
import { BlankInput } from 'hono/types';
import { auth } from './auth';
import { rpcMethods } from './rpc';

interface IAppEnvs {
  Variables: {
    user: typeof auth.$Infer.Session.user | null;
    session: typeof auth.$Infer.Session.session | null;
  };
}
const app = new Hono<IAppEnvs>();

const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN;

if (!ALLOWED_ORIGIN) {
  throw new Error('ALLOWED_ORIGIN is not set');
}

app.use(
  '*',
  cors({
    origin: ALLOWED_ORIGIN,
    allowHeaders: ['Content-Type', 'Authorization'],
    exposeHeaders: ['Content-Length'],
    credentials: true,
  })
);

app.use(
  '/api/auth/*',
  cors({
    origin: ALLOWED_ORIGIN,
    allowHeaders: ['Content-Type', 'Authorization'],
    allowMethods: ['POST', 'GET', 'OPTIONS'],
    exposeHeaders: ['Content-Length'],
    maxAge: 600,
    credentials: true,
  })
);

const rootDir = resolve(__dirname, '..');

const applyParamsToMethodWithContext = (
  fn: TMethod,
  params: unknown[],
  c: Context<IAppEnvs, '/**', BlankInput>
): Promise<void> => {
  console.log(c.req.raw.headers);

  return fn.apply(c, params);
};

createRPCServer(
  resolve(rootDir, 'tsconfig.json'),
  rootDir,
  resolve(rootDir, 'src/rpc.ts'),
  app,
  rpcMethods,
  applyParamsToMethodWithContext
);

app.on(['POST', 'GET'], '/api/auth/**', (c) => auth.handler(c.req.raw));

serve({
  fetch: app.fetch,
  port: 3000,
});

export default app;
