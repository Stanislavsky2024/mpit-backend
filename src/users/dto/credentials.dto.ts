import { createZodDto } from 'nestjs-zod';
import { credentialsSchema } from '../zod-schemas/credentials.zod';

export class CredentialsDto extends createZodDto(credentialsSchema) {}
