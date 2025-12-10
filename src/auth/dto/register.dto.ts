import { createZodDto } from 'nestjs-zod';
import { registerSchema } from '../zod-schemas/register.zod';

export class RegisterDto extends createZodDto(registerSchema) {}
