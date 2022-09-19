require('dotenv').config();
const env = process.env;

const { Sequelize, DataTypes } = require("sequelize");
const config = require("../setting/sequalize/config.js")[env.NODE_ENV];

const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.Sequelize = Sequelize;
db.sequelize = sequelize;

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("데이터베이스 연결됨.");
  })
  .catch((err) => {
    console.error(err);
  });

module.exports = db;