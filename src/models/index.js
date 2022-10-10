require('dotenv').config();
const env = process.env;

const { Sequelize, DataTypes } = require("sequelize");
const config = require("../settings/sequelize/config.js")[env.NODE_ENV];

// Model Import
const Whitelist = require('./whitelist');
const User = require('./user.js');
const Rasbpi = require('./rasbpi.js');

const db = Sequelize;

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

// Linking model to db
db.sequelize = sequelize;
db.whitelist = Whitelist;
db.user = User;
db.data = Rasbpi;

// Model Init
Whitelist.init(sequelize);
User.init(sequelize);
Rasbpi.init(sequelize);

// Model Association
Whitelist.associate(db);
Rasbpi.associate(db);
User.associate(db);


module.exports = db;