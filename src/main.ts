import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { FALLBACK_VALUES, httpCorsMethods, httpLocalhost } from './shared/constants';

const { PORT = FALLBACK_VALUES.SERVER_PORT } = process.env;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  app.enableCors({
    allowedHeaders: 'Content-Type,Authorization',
    credentials: true,
    methods: httpCorsMethods,
    origin: `${httpLocalhost}:${FALLBACK_VALUES.CLIENT_PORT}`,
  });
  await app.listen(PORT);
}

void bootstrap();
