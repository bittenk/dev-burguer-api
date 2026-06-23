const { Client } = require('pg');

const client = new Client({
    user: 'postgres.blpepzffhxptiyntdhsx', // O tenant completo que o Supabase exige
    password: 'Erk300163150421.',
    host: 'aws-0-us-east-1.pooler.supabase.com', // Pooler compatível com IPv4 do Render
    port: 6543, // Porta estável do Pooler
    database: 'postgres',
    // Aqui está o segredo: forçamos o SSL ativo de forma estruturada, forçando o Node a aceitar o certificado do Supabase
    ssl: {
        require: true,
        rejectUnauthorized: false
    }
});

async function run() {
    try {
        console.log('🚀 Conectando ao Pooler via propriedades explícitas (Evitando conflito de string)...');
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