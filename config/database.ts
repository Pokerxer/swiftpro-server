import path from 'path';
import type { Core } from '@strapi/strapi';

type ClientKind = 'sqlite' | 'postgres' | 'mysql';

interface DatabaseConfig {
  client: ClientKind;
  connection: {
    connectionString?: string;
    host?: string;
    port?: number;
    database?: string;
    user?: string;
    password?: string;
    ssl?: boolean | {
      key?: string;
      cert?: string;
      ca?: string;
      capath?: string;
      cipher?: string;
      rejectUnauthorized?: boolean;
    };
    schema?: string;
    filename?: string;
  };
  pool?: {
    min: number;
    max: number;
  };
  useNullAsDefault?: boolean;
  acquireConnectionTimeout?: number;
}

const config = ({ env }: Core.Config.Shared.ConfigParams): DatabaseConfig => {
  const client = (env('DATABASE_CLIENT', 'sqlite') || 'sqlite') as ClientKind;
  const isPostgres = client === 'postgres';
  const isMysql = client === 'mysql';

  if (isPostgres) {
    return {
      client: 'postgres',
      connection: {
        connectionString: env('DATABASE_URL'),
        host: env('DATABASE_HOST', 'localhost'),
        port: env.int('DATABASE_PORT', 5432),
        database: env('DATABASE_NAME', 'strapi'),
        user: env('DATABASE_USERNAME', 'strapi'),
        password: env('DATABASE_PASSWORD', 'strapi'),
        ssl: env.bool('DATABASE_SSL', false),
        schema: env('DATABASE_SCHEMA', 'public'),
      },
      pool: { min: env.int('DATABASE_POOL_MIN', 2), max: env.int('DATABASE_POOL_MAX', 10) },
      acquireConnectionTimeout: env.int('DATABASE_CONNECTION_TIMEOUT', 60000),
    };
  }

  if (isMysql) {
    return {
      client: 'mysql',
      connection: {
        host: env('DATABASE_HOST', 'localhost'),
        port: env.int('DATABASE_PORT', 3306),
        database: env('DATABASE_NAME', 'strapi'),
        user: env('DATABASE_USERNAME', 'strapi'),
        password: env('DATABASE_PASSWORD', 'strapi'),
        ssl: env.bool('DATABASE_SSL', false),
      },
      pool: { min: env.int('DATABASE_POOL_MIN', 2), max: env.int('DATABASE_POOL_MAX', 10) },
      acquireConnectionTimeout: env.int('DATABASE_CONNECTION_TIMEOUT', 60000),
    };
  }

  // SQLite
  return {
    client: 'sqlite',
    connection: {
      filename: path.join(__dirname, '..', '..', env('DATABASE_FILENAME', '.tmp/data.db')),
    },
    useNullAsDefault: true,
    acquireConnectionTimeout: env.int('DATABASE_CONNECTION_TIMEOUT', 60000),
  };
};

export default config;