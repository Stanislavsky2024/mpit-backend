import { createZodDto } from 'nestjs-zod';
import { loginSchema } from '../zod-schemas/login-schema';

export class LoginDto extends createZodDto(loginSchema) {}
