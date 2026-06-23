const { Client } = require('pg');

const client = new Client({
    user: 'postgres',
    password: 'Erk300163150421.',
    host: 'db.blpepzffhxptiyntdhsx.supabase.co', // Conexão Direta do Supabase (Evita o bug do Pooler)
    port: 5432, // Porta padrão do PostgreSQL
    database: 'postgres',
    ssl: {
        rejectUnauthorized: false // Ignora o certificado autoassinado de forma limpa
    }
});

async function run() {
    try {
        console.log('🚀 Conectando diretamente ao banco Supabase (Porta 5432)...');
        await client.connect();
        console.log('✅ CONEXÃO ESTABELECIDA COM SUCESSO!');

        // Cria a tabela de metadados do Sequelize se não existir
        await client.query(`CREATE TABLE IF NOT EXISTS "SequelizeMeta" (name VARCHAR(255) NOT NULL PRIMARY KEY);`);

        console.log('🎉 Tudo pronto para o deploy!');
        await client.end();
        process.exit(0);
    } catch (err) {
        console.error('❌ Erro crítico de conexão:', err.message);
        process.exit(1);
    }
}

run();