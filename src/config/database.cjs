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
    username: 'postgres.blpepzffhxptiyntdhsx', // O usuário com ponto isolado aqui
    password: 'Erk300163150421.',             // A senha isolada aqui
    database: 'postgres',
    host: 'aws-0-us-east-1.pooler.supabase.com', // O host IPv4 isolado aqui
    port: 5432, // Session mode
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