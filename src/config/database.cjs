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
    url: process.env.DATABASE_URL, // Vai ler a variável do Supabase salva no Render
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // Exigido pelo Supabase para conexões externas seguras
      },
    },
    define: {
      timestamps: true,
      underscored: true,
      underscoredAll: true,
    },
  },
};