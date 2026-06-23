const { Client } = require('pg');

// 1. Mantemos a string EXATAMENTE como o Supabase exige para o Pooler IPv4 funcionar
const connectionString = 'postgresql://postgres.blpepzffhxptiyntdhsx:Erk300163150421.@aws-0-us-east-1.pooler.supabase.com:6543/postgres?sslmode=require';

// 2. Criamos o cliente passando a string, mas injetamos o bypass de certificado diretamente no objeto global de configuração do driver
const client = new Client({
    connectionString: connectionString,
    ssl: {
        rejectUnauthorized: false
    }
});

// Forçamos o parágrafo de segurança no nível do módulo nativo do Node do pg
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

async function run() {
    try {
        console.log('🚀 Conectando ao Pooler Supabase com bypass duplo de SSL...');
        await client.connect();
        console.log('✅ CONEXÃO ESTABELECIDA COM SUCESSO!');

        // Cria a tabela do Sequelize de forma nativa
        await client.query(`CREATE TABLE IF NOT EXISTS "SequelizeMeta" (name VARCHAR(255) NOT NULL PRIMARY KEY);`);

        console.log('🎉 Banco de dados preparado para produção!');
        await client.end();
        process.exit(0);
    } catch (err) {
        console.error('❌ Erro crítico de conexão:', err.message);
        process.exit(1);
    }
}

run();