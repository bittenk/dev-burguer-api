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
    url: 'postgresql://postgres.blpepzffhxptiyntdhsx:Erk300163150421.@aws-0-us-east-1.pooler.supabase.com:6543/postgres?sslmode=require',
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false // Mata o erro de self-signed certificate no Sequelize
      }
    },
    define: {
      timestamps: true,
      underscored: true,
      underscoredAll: true,
    },
  },
};