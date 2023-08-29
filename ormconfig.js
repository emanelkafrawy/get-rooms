
const Config = require('config');
const databaseConfig = Config.get('db_config')
module.exports = {
    type: databaseConfig.type,
    host: databaseConfig.host,
    port: 3306,
    username: databaseConfig.username,
    password: databaseConfig.password,
    database: databaseConfig.database,
    synchronize: false,
    logging: true,
    connectTimeout: 120000,
    connectionLimit: 100000,
    acquireTimeout: 3600000,
    timeout: 3600000,
    entities: ['./src/entity/*.ts'],
    migrations: ['./src/migration/**/*.js', './src/migration/**/*.ts'],
    cli: {
      entitiesDir: './src/entity',
      migrationsDir: './src/migration',
    },
  };
  