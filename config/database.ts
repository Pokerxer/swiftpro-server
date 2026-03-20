import path from 'path';
import type { Core } from '@strapi/strapi';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const config = ({ env }: Core.Config.Shared.ConfigParams): any => {
  const client = env('DATABASE_CLIENT', 'sqlite');

  // PostgreSQL configuration
  if (client === 'postgres') {
    return {
      client: 'postgres',
      connection: {
        connectionString: env('DATABASE_URL'),
        host: env('DATABASE_HOST'),
        port: env.int('DATABASE_PORT', 5432),
        database: env('DATABASE_NAME'),
        user: env('DATABASE_USERNAME'),
        password: env('DATABASE_PASSWORD'),
        ssl: env.bool('DATABASE_SSL', false),
        schema: env('DATABASE_SCHEMA', 'public'),
      },
      pool: { min: 2, max: 10 },
    };
  }

  // MySQL configuration
  if (client === 'mysql') {
    return {
      client: 'mysql',
      connection: {
        host: env('DATABASE_HOST'),
        port: env.int('DATABASE_PORT', 3306),
        database: env('DATABASE_NAME'),
        user: env('DATABASE_USERNAME'),
        password: env('DATABASE_PASSWORD'),
        ssl: env.bool('DATABASE_SSL', false),
      },
      pool: { min: 2, max: 10 },
    };
  }

  // SQLite (default)
  return {
    client: 'sqlite',
    connection: {
      filename: path.join(__dirname, '..', '..', env('DATABASE_FILENAME', '.tmp/data.db')),
    },
    useNullAsDefault: true,
  };
};

export default config;