import { z } from 'zod';

export const registerSchema = z
  .object({
    username: z.string().min(3).max(50),
    email: z.email(),
    password: z.string().min(6),
  })
  .required();

export type RegisterType = z.infer<typeof registerSchema>;
