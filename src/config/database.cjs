require('dotenv').config();

module.exports = {
  development: {
    username: 'postgres',
    password: 'Erk300163150421.',
    database: 'postgres',
    host: 'localhost',
    dialect: 'postgres',
    port: 5432,
    define: {
      timestamps: true,
      underscored: true,
      underscoredAll: true,
    },
  },
  production: {
    username: 'postgres.blpepzffhxptiyntdhsx',
    password: 'Erk300163150421.',
    database: 'postgres',
    host: 'aws-0-us-east-1.pooler.supabase.com',
    port: 6543, // Porta correta do Pooler para contornar o tenant not found
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    define: {
      timestamps: true,
      underscored: true,
      underscoredAll: true,
    },
  },
};