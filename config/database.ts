import path from 'path';

const config = ({ env }: any) => {
  // Check for PostgreSQL connection string first (Railway)
  const databaseUrl = env('DATABASE_URL') || env('DATABASE_PUBLIC_URL');
  
  if (databaseUrl && databaseUrl.startsWith('postgres')) {
    return {
      client: 'postgres',
      connection: {
        connectionString: databaseUrl,
        ssl: false,
      },
      pool: { min: 2, max: 10 },
    };
  }

  // Check DATABASE_CLIENT env var
  const client = env('DATABASE_CLIENT', 'sqlite');

  if (client === 'postgres') {
    return {
      client: 'postgres',
      connection: {
        host: env('DATABASE_HOST', 'localhost'),
        port: env.int('DATABASE_PORT', 5432),
        database: env('DATABASE_NAME', env('PGDATABASE', 'strapi')),
        user: env('DATABASE_USERNAME', env('PGUSER', 'strapi')),
        password: env('DATABASE_PASSWORD', env('POSTGRES_PASSWORD', '')),
        ssl: env.bool('DATABASE_SSL', false),
        schema: env('DATABASE_SCHEMA', 'public'),
      },
      pool: { min: 2, max: 10 },
    };
  }

  if (client === 'mysql') {
    return {
      client: 'mysql',
      connection: {
        host: env('DATABASE_HOST', 'localhost'),
        port: env.int('DATABASE_PORT', 3306),
        database: env('DATABASE_NAME', 'strapi'),
        user: env('DATABASE_USERNAME', 'strapi'),
        password: env('DATABASE_PASSWORD', ''),
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
