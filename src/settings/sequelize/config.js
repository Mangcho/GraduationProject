import "../../settings/env/env.js";
const env = process.env;

const development = {
  username: env.DB_USER || 'root',
  password: env.DB_PW || 'password',
  database: env.DB_NAME || 'database',
  host: env.DB_HOST || 'localhost',
  dialect: 'mariadb',
  dialectOptions: {
    useUTC: false, // for reading from database
    dateStrings: true,
    typeCast: true,
  },
  timezone: "+09:00",
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
  dialectOptions: {
    useUTC: false, // for reading from database
    dateStrings: true,
    typeCast: true,
  },
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