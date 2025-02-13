import type { Schema } from 'zod';
import { z } from 'zod';

export const loginSchemaZod: Schema = z
  .object({
    email: z.string().email(),
    password: z.string().min(4, { message: 'Password must be at least 4 characters long' }).max(18, { message: 'Password must be at most 18 characters long' }),
  })
  .strict();
