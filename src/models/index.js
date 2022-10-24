import "../settings/env/env.js";
const env = process.env;

import { Sequelize, DataTypes } from 'sequelize';
import {development, production } from "../settings/sequelize/config.js"
let config;
if (env.NODE_ENV == 'development'){
  config = development;
} else {
  config = production;
}

// Model Import
import Whitelist from "./whitelist.js";
import User from "./user.js";
import Rasbpi from "./rasbpi.js";
import Session from "./session.js";

export const db = Sequelize;

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
db.session = Session;

// Model Init
Whitelist.init(sequelize);
User.init(sequelize);
Rasbpi.init(sequelize);
Session.init(sequelize);

// Model Association
Whitelist.associate(db);
Rasbpi.associate(db);
User.associate(db);