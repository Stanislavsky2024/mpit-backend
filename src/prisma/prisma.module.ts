import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global()
@Module({
  exports: [PrismaService],
  controllers: [],
  providers: [PrismaService],
})
export class PrismaModule {}
