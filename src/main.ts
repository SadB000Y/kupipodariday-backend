import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';
import { FALLBACK_VALUES } from './shared/constants';
import { httpCorsMethods } from './shared/constants';
import { httpLocalhost } from './shared/constants';

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