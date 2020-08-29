const knexConfig = {
  development: {
    client: "pg",
    connection: "postgres://user@127.0.0.1:5432/user",
    migrations: {
      directory: "./src/db/migrations",
    },
    useNullAsDefault: true,
  },
  production: {
    client: "pg",
    connection: `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:5432/${process.env.DB_NAME}`,
    migrations: {
      directory: "./src/db/migrations",
    },
    useNullAsDefault: true,
  },
};

module.exports = knexConfig;
