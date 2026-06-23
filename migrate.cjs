const { Sequelize } = require('sequelize');
const { Umzug, SequelizeStorage } = require('umzug');
const config = require('./src/config/database.cjs').production;

// Inicializa o Sequelize passando as propriedades isoladas nativamente
const sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    port: config.port,
    dialect: config.dialect,
    dialectOptions: config.dialectOptions,
    define: config.define,
    logging: console.log,
});

const umzug = new Umzug({
    migrations: { glob: 'src/database/migrations/*.js' }, // Ajuste o caminho se suas migrations estiverem em outra pasta
    context: sequelize.getQueryInterface(),
    storage: new SequelizeStorage({ sequelize }),
    logger: console,
});

(async () => {
    try {
        console.log('🚀 Iniciando as migrations via Umzug...');
        await sequelize.authenticate();
        console.log('🛡️ Conexão com o banco estabelecida com sucesso.');
        await umzug.up();
        console.log('✅ Migrations executadas com sucesso!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Erro ao rodar as migrations:', error);
        process.exit(1);
    }
})();