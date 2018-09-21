require('dotenv').config()

module.exports = {
  client: 'pg',
  connection: process.env.DB_URL,
  migrations: {
    directory: 'database/migrations',
    tableName: 'knex_migrations_u2f'
  },
  seeds: {
    directory: 'database/seeds',
  }
}
