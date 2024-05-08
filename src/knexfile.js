// knexfile.js

require('dotenv').config();

module.exports = {
  development: {
    client: 'mysql',
    connection: {
      host: process.env.DB_HOST || '127.0.0.1',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || 'password',
      database: process.env.DB_NAME || 'library',
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './src/migrations',
    },
  },
};
