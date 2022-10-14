require('dotenv').config();
const env = process.env;

const development = {
  username: env.DB_USER,
  password: env.DB_PW,
  database: env.DB_NAME,
  host: env.DB_HOST,
  dialect: "mariadb",
  pool: {
    max: 30,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
  //port: env.MYSQL_PORT
};

const production = {
  username: env.DB_USER,
  password: env.DB_PW,
  database: env.DB_NAME,
  host: env.DB_HOST,
  dialect: "mariadb",
  logging: false,
  pool: {
    max: 30,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
  //port: env.MYSQL_PORT
};

module.exports = { development, production };