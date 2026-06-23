const { Client } = require('pg');

const client = new Client({
    user: 'postgres.blpepzffhxptiyntdhsx', // Tenant obrigatório do Pooler
    password: 'Erk300163150421',           // Nova senha limpa (sem ponto!)
    host: 'aws-0-us-east-1.pooler.supabase.com',
    port: 6543,                            // Porta do Pooler estável via IPv4 no Render
    database: 'postgres',
    ssl: {
        rejectUnauthorized: false            // Ignora o certificado autoassinado do Supabase
    }
});

async function run() {
    try {
        console.log('🚀 Conectando ao Pooler com a nova senha corrigida...');
        await client.connect();
        console.log('✅ CONEXÃO ESTABELECIDA COM SUCESSO!');

        // Cria a tabela de controle de migrations
        await client.query(`CREATE TABLE IF NOT EXISTS "SequelizeMeta" (name VARCHAR(255) NOT NULL PRIMARY KEY);`);

        console.log('🎉 Banco de dados preparado para o deploy!');
        await client.end();
        process.exit(0);
    } catch (err) {
        console.error('❌ Erro crítico de conexão:', err.message);
        process.exit(1);
    }
}

run();