require("dotenv").config();

module.exports = {
  development: {
    db: "mysql",
    connection: {
      host: '127.0.0.1',
      user: 'root',
      password: 'password',
      database: 'library',
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "./src/migrations",
    },
  },
};