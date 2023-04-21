import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { AppModule } from '@/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          imgSrc: [
            "'self'",
            'data:',
            'https://www.gravatar.com',
            'https://validator.swagger.io',
          ],
          styleSrc: [
            `'self'`,
            `'unsafe-inline'`,
            'data:',
            'https://fonts.googleapis.com',
          ],
          scriptSrc: ["'self'", "'unsafe-eval'"],
          objectSrc: ["'self'"],
          defaultSrc: [`'self'`],
        },
      },
      crossOriginEmbedderPolicy: false,
    }),
  );
  app.use(cookieParser());

  await app.listen(process.env.PORT as string);
  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap().then();
