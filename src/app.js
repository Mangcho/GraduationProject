// Dependencies import
const express = require("express");
const app = express();
require("dotenv").config();
const path = require("path");
const db = require("./models");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

// Router import
const authRouter = require("./routes/api/auth");
const piRouter = require("./routes/pi");

// utils import
const wrapper = require("./utils/wrapper.js");

// Settings
// DB load and set
async function synchronize(db) {
  try {
    const response = await db.sequelize
      .sync({ force: process.env.NODE_ENV === "development" ? true : false }) // DROP EVERY EXISTING TABLE when force = true
    console.log("### DATABASE CONNECTED!!! ###");
  } catch (err) {
    console.error(err);
  }
}


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
synchronize(db);