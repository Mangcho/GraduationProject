import "../../settings/env/env.js";
const env = process.env;

const development = {
  username: env.DB_USER || 'root',
  password: env.DB_PW || 'password',
  database: env.DB_NAME || 'database',
  host: env.DB_HOST || 'localhost',
  dialect: 'mariadb',
  timezone: env.DB_TIMEZONE,
  pool: {
    max: 30,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
  //port: env.MYSQL_PORT
};

const production = {
  username: env.DB_USER || 'root',
  password: env.DB_PW || 'password',
  database: env.DB_NAME || 'database',
  host: env.DB_HOST || 'localhost',
  dialect: 'mariadb',
  logging: false,
  timezone: env.DB_TIMEZONE,
  pool: {
    max: 30,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
  //port: env.MYSQL_PORT
};

export {development, production}