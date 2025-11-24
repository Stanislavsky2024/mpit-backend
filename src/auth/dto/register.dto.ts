import { createZodDto } from 'nestjs-zod';
import { registerSchema } from '../zod-schemas/register-schema';

export class RegisterDto extends createZodDto(registerSchema) {}
