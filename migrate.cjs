const { Client } = require('pg');

// Usamos a Connection String completa do Pooler (Modo Transação - Porta 6543)
// Ela já passa o ID do projeto mapeado corretamente para o gateway IPv4 do Supabase
const connectionString = 'postgresql://postgres.blpepzffhxptiyntdhsx:Erk300163150421.@aws-0-us-east-1.pooler.supabase.com:6543/postgres?sslmode=require';

const client = new Client({
    connectionString: connectionString,
    ssl: {
        require: true,
        rejectUnauthorized: false
    }
});

async function run() {
    try {
        console.log('🚀 Conectando ao Pooler Supabase IPv4 via Connection String...');
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