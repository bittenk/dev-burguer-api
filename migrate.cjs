const { Client } = require('pg');

// Usamos a Connection String com o parâmetro nativo 'sslmode=no-verify'
// Isso resolve o SNI do Tenant no gateway IPv4 do Supabase E desativa a rejeição de certificados autoassinados ao mesmo tempo.
const connectionString = 'postgresql://postgres.blpepzffhxptiyntdhsx:Erk300163150421.@aws-0-us-east-1.pooler.supabase.com:6543/postgres?sslmode=no-verify';

const client = new Client({
    connectionString: connectionString
});

async function run() {
    try {
        console.log('🚀 Conectando ao Pooler Supabase via URI com bypass de SSL...');
        await client.connect();
        console.log('✅ Conexão estabelecida com sucesso!');

        // Cria a tabela de controle do Sequelize de forma nativa
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