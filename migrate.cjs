const { Client } = require('pg');

// String de conexão original do Pooler com o parâmetro de SSL obrigatório na Query
const connectionString = 'postgresql://postgres.blpepzffhxptiyntdhsx:Erk300163150421.@aws-0-us-east-1.pooler.supabase.com:6543/postgres?sslmode=require';

const client = new Client({
    connectionString: connectionString,
    // Força o driver a ignorar certificados autoassinados mantendo o handshake TLS ativo
    ssl: {
        rejectUnauthorized: false
    }
});

async function run() {
    try {
        console.log('🚀 Conectando com Connection String + Configuração Híbrida de SSL...');
        await client.connect();
        console.log('✅ Conexão estabelecida com sucesso!');

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