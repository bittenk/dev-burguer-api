const { Client } = require('pg');

// Removemos o '?sslmode=require' do final da string para o objeto ssl abaixo ter prioridade total
const connectionString = 'postgresql://postgres.blpepzffhxptiyntdhsx:Erk300163150421.@aws-0-us-east-1.pooler.supabase.com:6543/postgres';

const client = new Client({
    connectionString: connectionString,
    // Passando o objeto puro para forçar o driver pg a aceitar o certificado do pooler do Supabase
    ssl: {
        rejectUnauthorized: false
    }
});

async function run() {
    try {
        console.log('🚀 Conectando ao Pooler Supabase IPv4 com SSL flexível...');
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