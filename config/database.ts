import path from 'path';

export default ({ env }: any) => {
  const pgHost = process.env.PGHOST;
  const pgUser = process.env.PGUSER || 'postgres';
  const pgPassword = process.env.POSTGRES_PASSWORD || '';
  const pgDatabase = process.env.PGDATABASE || 'railway';
  const pgPort = process.env.PGPORT || '5432';

  // PostgreSQL on Railway
  if (pgHost) {
    return {
      connection: {
        client: 'postgres',
        connection: {
          host: pgHost,
          port: Number(pgPort),
          database: pgDatabase,
          user: pgUser,
          password: pgPassword,
          ssl: false,
        },
        pool: { min: 2, max: 10 },
      },
    };
  }

  // SQLite for local development
  return {
    connection: {
      client: 'sqlite',
      connection: {
        filename: path.join(__dirname, '..', '..', '.tmp', 'data.db'),
      },
      useNullAsDefault: true,
    },
  };
};
