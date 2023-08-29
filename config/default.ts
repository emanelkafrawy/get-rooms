module.exports = {
    is_production: false,
    db_config: {
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || '3306',
      username: process.env.DB_USERNAME || '',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'get_rooms',
      type: process.env.DB_TYPE || 'mysql',
    },
    host: process.env.HOST || 'localhost',
    port: process.env.PORT || 3001
  }
  