require('dotenv').config();

// Codifica os caracteres especiais para o parser de URL do Sequelize não quebrar
const user = encodeURIComponent('postgres.blpepzffhxptiyntdhsx');
const password = encodeURIComponent('Erk300163150421.');
const host = 'aws-0-us-east-1.pooler.supabase.com';
const database = 'postgres';

const prodUri = `postgresql://${user}:${password}@${host}:5432/${database}?sslmode=require`;

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
    url: prodUri,
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