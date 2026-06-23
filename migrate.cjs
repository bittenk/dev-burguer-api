const { Client } = require('pg');

// URI exata copiada do seu painel do Supabase (Transaction Pooler - Porta 6543)
const connectionString = 'postgresql://postgres.blpepzffhxptiyntdhsx:Erk300163150421@aws-0-us-east-1.pooler.supabase.com:5432/postgres?sslmode=require';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const client = new Client({
    connectionString: connectionString
});

async function run() {
    try {
        console.log('🚀 Conectando ao Pooler Oficial do projeto com a nova senha...');
        await client.connect();
        console.log('✅ CONEXÃO ESTABELECIDA COM SUCESSO!');

        await client.query(`CREATE TABLE IF NOT EXISTS "SequelizeMeta" (name VARCHAR(255) NOT NULL PRIMARY KEY);`);

        console.log('🎉 Banco pronto para o deploy!');
        await client.end();
        process.exit(0);
    } catch (err) {
        console.error('❌ Erro crítico de conexão:', err.message);
        process.exit(1);
    }
}

run();