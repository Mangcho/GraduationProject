// Dependencies import
const express = require("express");
const app = express();
require("dotenv").config();
const path = require("path");
const db = require("./models");
const sequelizeLoader = require('./loaders/sequelize');
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

// utils import
const wrapper = require("./utils/wrapper.js");

// Router import
const authRouter = require("./routes/api/auth");
const piRouter = require("./routes/pi");

// session set
app.use(
  session({
    // Options for express-session
    secret: process.env.SECRET_KEY,
    store: new SequelizeStore({
      // Options for connect-session-sequelize
      db: db.sequelize,
      tableName: "sessions",
    }),
    saveUninitialized: false,
    resave: false,
    proxy: false,
  })
);

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routings
app.use("/api/auth", authRouter);
app.use("/pi", piRouter);

app.get(
  "*",
  wrapper(async (req, res) => {
    res.sendFile(path.join(__dirname, "public/index.html"));
  })
);

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).end();
});

async function startServer() {
  app.listen(process.env.PORT, () => {
    console.log("==================");
    console.log("Server Started!");
    console.log("==================");
  });
}

startServer();
(async () => {
  await sequelizeLoader.synchronize(db);
})()