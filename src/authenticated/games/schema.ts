import z from 'zod';

export const schema = z
  .object({
    orderBy: z
      .object({
        startAt: z.union([z.literal('asc'), z.literal('desc')]).optional(),
      })
      .optional(),
  })
  .optional();
