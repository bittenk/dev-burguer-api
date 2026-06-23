const { Client } = require('pg');

const client = new Client({
    user: 'postgres', // Limpo, sem ponto e sem o ID do projeto!
    password: 'Erk300163150421.',
    host: 'aws-0-us-east-1.pooler.supabase.com', // Pooler IPv4
    port: 6543,
    database: 'blpepzffhxptiyntdhsx', // O ID do seu projeto entra AQUI como o nome do banco
    ssl: {
        require: true,
        rejectUnauthorized: false // Evita o erro de certificado autoassinado
    }
});

async function run() {
    try {
        console.log('🚀 Conectando ao Pooler com mapeamento alternativo de Tenant...');
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