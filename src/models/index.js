require('dotenv').config();
const env = process.env;

const { Sequelize, DataTypes } = require("sequelize");
const config = require("../setting/sequelize/config.js")[env.NODE_ENV];

// Model Import
const Whitelist = require('./whitelist');
const User = require('./user.js');
const Data = require('./data.js');

const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.Sequelize = Sequelize;

// Linking model to db
db.sequelize = sequelize;
db.whitelist = Whitelist;
db.user = User;
db.data = Data;

// Model Init
Whitelist.init(sequelize);
User.init(sequelize);
Data.init(sequelize);

// Model Association
Whitelist.associate(db);
Data.associate(db);
User.associate(db);


module.exports = db;