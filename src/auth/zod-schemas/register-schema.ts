import { z } from 'zod';

export const registerSchema = z
  .object({
    email: z.email(),
    password: z.string().min(6),
  })
  .required();

export type RegisterType = z.infer<typeof registerSchema>;
