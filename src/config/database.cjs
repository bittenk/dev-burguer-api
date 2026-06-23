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
    port: 6543, // Mantemos a porta estável do pooler
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
        // CRUCIAL: Força o driver pg a enviar o SNI para o pooler identificar o tenant
        servername: 'aws-0-us-east-1.pooler.supabase.com',
      },
    },
    define: {
      timestamps: true,
      underscored: true,
      underscoredAll: true,
    },
  },
};