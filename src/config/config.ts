import { join } from 'path';

export default () => ({
  server: { port: parseInt(process.env.SERVER_PORT, 10) || 3000 },
  database: {
    type: process.env.DATABASE_TYPE || 'postgres',
    host: process.env.DATABASE_HOST || '127.0.0.1',
    port: parseInt(process.env.DATABASE_PORT, 10) || 65555,
    username: process.env.DATABASE_USER || 'Viktor',
    password: process.env.DATABASE_PASSWORD || 'user1234321',
    database: process.env.DATABASE_NAME || 'kupipodariday',
    entities: [join(__dirname, '/../**/*.entity.{js,ts}')],
    synchronize: Boolean(process.env.DATABASE_SYNCHRONIZE) || true,
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'secret',
    exp: process.env.JWT_EXP || '1h',
  },
});
