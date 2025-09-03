import z from 'zod';

export const schema = z.object({
  gameId: z.uuid(),
});
