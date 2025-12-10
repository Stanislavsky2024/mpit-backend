import { z } from 'zod';

export const registerSchema = z.object({
  email: z.email(),
  username: z.string(),
  password: z.string(),
});

export type TRegisterSchema = z.infer<typeof registerSchema>;
