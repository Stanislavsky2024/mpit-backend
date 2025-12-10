import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import { ZodValidationPipe } from 'nestjs-zod';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: ['http://localhost:5173'],
      credentials: true,
      allowedHeaders: ['Content-Type', 'Authorization'],
      methods: ['POST', 'GET'],
    },
  });

  app.use(cookieParser());
  app.useGlobalPipes(new ZodValidationPipe());

  await app.listen(process.env.PORT ?? 5000);
}
void bootstrap();
