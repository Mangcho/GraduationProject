require('dotenv').config();
const env = process.env;

const { Sequelize, DataTypes } = require("sequelize");
const config = require("../setting/sequalize/config.js")[env.NODE_ENV];

const whitelist = require('./whitelist');

const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);


db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.whitelist = whitelist;
whitelist.init(sequelize);




module.exports = db;