import { createZodDto } from 'nestjs-zod';
import { loginSchema } from '../zod-schemas/login.zod';

export class LoginDto extends createZodDto(loginSchema) {}
