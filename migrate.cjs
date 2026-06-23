const { Client } = require('pg');

// String completa apontando para o Pooler (Porta 6543) com sua senha nova e limpa
const connectionString = 'postgresql://postgres.blpepzffhxptiyntdhsx:Erk300163150421@aws-0-us-east-1.pooler.supabase.com:6543/postgres?sslmode=require';

// Desativa globalmente a rejeição de certificados autoassinados no ambiente do Node
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const client = new Client({
    connectionString: connectionString
});

async function run() {
    try {
        console.log('🚀 Conectando ao Pooler Supabase via URI unificada...');
        await client.connect();
        console.log('✅ CONEXÃO ESTABELECIDA COM SUCESSO!');

        // Cria a tabela do Sequelizemeta nativamente se não existir
        await client.query(`CREATE TABLE IF NOT EXISTS "SequelizeMeta" (name VARCHAR(255) NOT NULL PRIMARY KEY);`);

        console.log('🎉 Banco de dados pronto para rodar!');
        await client.end();
        process.exit(0);
    } catch (err) {
        console.error('❌ Erro crítico de conexão:', err.message);
        process.exit(1);
    }
}

run();