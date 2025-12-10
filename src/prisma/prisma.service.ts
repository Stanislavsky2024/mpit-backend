import { Injectable } from '@nestjs/common';
import { PrismaClient } from '../../generated/prisma';
import { PrismaPg } from '@prisma/adapter-pg';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(configService: ConfigService) {
    const url = configService.getOrThrow<string>('DATABASE_URL');
    const adapter = new PrismaPg({ connectionString: url });
    super({ adapter });
  }
}
