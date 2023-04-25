import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { AppModule } from '@/app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          imgSrc: ["'self'", 'data:', 'https://cdn.jsdelivr.net'],
          styleSrc: [
            `'self'`,
            `'unsafe-inline'`,
            'data:',
            'https://cdn.jsdelivr.net',
          ],
          scriptSrc: ["'self'", "https: 'unsafe-inline'", "'unsafe-eval'"],
          objectSrc: ["'self'"],
          defaultSrc: [`'self'`],
        },
      },
      crossOriginEmbedderPolicy: false,
    }),
  );
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT as string);
  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap().then();
