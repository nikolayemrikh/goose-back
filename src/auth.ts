import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { admin as adminPlugin } from 'better-auth/plugins';
import { PrismaClient } from '../prisma/generated/prisma';
import { ALLOWED_ORIGIN } from './env';
import { ac, admin, nikita, regularPlayer } from './permissions';

const CURSED_USERNAME = 'Никита';
const ADMIN_USERNAME = 'admin';

const prisma = new PrismaClient();
export const auth = betterAuth({
  trustedOrigins: [ALLOWED_ORIGIN],
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  emailAndPassword: {
    enabled: true,
  },
  databaseHooks: {
    user: {
      create: {
        after: async (user) => {
          await prisma.user.update({
            where: { id: user.id },
            data: {
              role: user.name === CURSED_USERNAME ? 'nikita' : user.name === ADMIN_USERNAME ? 'admin' : 'regularPlayer',
            },
          });
        },
      },
    },
  },
  plugins: [
    adminPlugin({
      ac,
      roles: {
        admin,
        regularPlayer,
        nikita,
      },
    }),
  ],
});
