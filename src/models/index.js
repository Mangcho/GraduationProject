import "../settings/env/env.js";
const env = process.env;
import { Sequelize, DataTypes } from 'sequelize';
import { development, production } from "../settings/sequelize/config.js"
const config = env.NODE_ENV === "development" ? development : production

// Model Import
import WhitelistModel from "./whitelist.js";
import UserModel from "./user.js";
import RasbpiModel from "./rasbpi.js";
import SessionModel from "./session.js";

export const db = Sequelize;

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

// Linking model to db
db.sequelize = sequelize;
db.whitelist = WhitelistModel;
db.user = UserModel;
db.data = RasbpiModel;
db.session = SessionModel;

// Model Init
WhitelistModel.init(sequelize);
UserModel.init(sequelize);
RasbpiModel.init(sequelize);
SessionModel.init(sequelize);

// Model Association
WhitelistModel.associate(db);
UserModel.associate(db);
RasbpiModel.associate(db);
