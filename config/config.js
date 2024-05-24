require("dotenv").config();


module.exports = {
  db: {
    client: 'mysql',
    connection: {
      host: '127.0.0.1',
      user: 'root',
      password: 'password',
      database: 'sqldb',
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "./src/migrations",
    },
  }
};