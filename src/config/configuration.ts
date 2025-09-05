import { FALLBACK_VALUES } from '../shared/constants';

export default () => ({
  db: {
    autoloadEntities: Boolean(process.env.DATABASE_AUTOLOAD_ENTITIES),
    type: process.env.DATABASE_TYPE,
    host: process.env.DATABASE_HOST ?? 'localhost',
    name: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD,
    port: parseInt(process.env.DATABASE_PORT, 10) || 65555,
    synchronize: Boolean(process.env.DATABASE_SYNCHRONIZE) || true,
    username: process.env.DATABASE_USERNAME,
  },
  jwt: {
    secretKey: process.env.JWT_SECRET_KEY,
    tokenTimeLimit: process.env.JWT_TOKEN_TIME_LIMIT,
  },
  server: {
    port: process.env.PORT ? parseInt(process.env.PORT, 10) : FALLBACK_VALUES.SERVER_PORT,
  },
});