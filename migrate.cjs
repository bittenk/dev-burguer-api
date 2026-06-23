const { Client } = require('pg');

// Passamos a URL padrão com sslmode=require para o gateway ler o SNI do Tenant
const connectionString = 'postgresql://postgres.blpepzffhxptiyntdhsx:Erk300163150421.@aws-0-us-east-1.pooler.supabase.com:6543/postgres?sslmode=require';

const client = new Client({
    connectionString: connectionString,
    // O segredo está aqui: Forçamos o driver nativo a ignorar a validação do certificado 
    // diretamente nas propriedades de inicialização do TLS, anulando o bloqueio da build do Render
    ssl: {
        rejectUnauthorized: false
    }
});

async function run() {
    try {
        console.log('🚀 Conectando ao Pooler via infraestrutura híbrida estável...');
        await client.connect();
        console.log('✅ Conexão estabelecida com sucesso!');

        // Cria a tabela de controle de forma nativa
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