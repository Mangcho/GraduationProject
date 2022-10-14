import "../settings/env/env.js";
const env = process.env;

import { Sequelize, DataTypes } from 'sequelize';
import {development, production } from "../settings/sequelize/config.js"
const config = development;

// Model Import
import Whitelist from "./whitelist.js";
import User from "./user.js";
import Rasbpi from "./rasbpi.js";

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

// Model Init
Whitelist.init(sequelize);
User.init(sequelize);
Rasbpi.init(sequelize);

// Model Association
Whitelist.associate(db);
Rasbpi.associate(db);
User.associate(db);
