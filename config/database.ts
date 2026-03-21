import path from 'path';

const config = ({ env }: any) => {
  // Direct Railway PostgreSQL variables
  const pgUser = process.env.PGUSER || process.env.POSTGRES_USER || 'postgres';
  const pgPassword = process.env.POSTGRES_PASSWORD || '';
  const pgDatabase = process.env.PGDATABASE || process.env.POSTGRES_DB || 'railway';
  const pgHost = process.env.PGHOST || process.env.RAILWAY_PRIVATE_DOMAIN || 'localhost';
  const pgPort = process.env.PGPORT || '5432';
  const databaseUrl = process.env.DATABASE_URL || process.env.DATABASE_PUBLIC_URL;

  // Log for debugging
  console.log('Database config:', {
    pgHost,
    pgPort,
    pgDatabase,
    pgUser,
    hasPassword: !!pgPassword,
    hasUrl: !!databaseUrl,
  });

  // Use connection string if available
  if (databaseUrl) {
    return {
      client: 'postgres',
      connection: {
        connectionString: databaseUrl,
      },
      pool: { min: 2, max: 10 },
    };
  }

  // Build connection from individual variables
  if (pgHost && pgHost !== 'localhost') {
    const connectionString = `postgresql://${pgUser}:${pgPassword}@${pgHost}:${pgPort}/${pgDatabase}`;
    return {
      client: 'postgres',
      connection: {
        connectionString,
      },
      pool: { min: 2, max: 10 },
    };
  }

  // SQLite fallback for local development
  return {
    client: 'sqlite',
    connection: {
      filename: path.join(__dirname, '..', '..', '.tmp', 'data.db'),
    },
    useNullAsDefault: true,
  };
};

export default config;
