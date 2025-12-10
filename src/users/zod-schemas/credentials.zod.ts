import { z } from 'zod';

export const credentialsSchema = z.object({
  username: z.string().min(5),
});
