const { Client } = require('pg');

// Conexão Direta ao Banco (Bypassa o Pooler que está rejeitando o tenant)
const client = new Client({
    user: 'postgres', // Usuário padrão limpo (sem ponto)
    password: 'Erk300163150421.',
    host: 'db.blpepzffhxptiyntdhsx.supabase.co', // Host de conexão direta do seu projeto
    port: 5432, // Porta padrão estável
    database: 'postgres',
    ssl: {
        require: true,
        rejectUnauthorized: false
    }
});

async function run() {
    try {
        console.log('🚀 Conectando via Conexão DIRETA (db.blpepzffhxptiyntdhsx.supabase.co)...');
        await client.connect();
        console.log('✅ Conexão direta estabelecida com sucesso!');

        // Garante a tabela do Sequelize de forma nativa
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