// Dependencies
const express = require('express');
require('dotenv').config()
const path = require('path');
const db = require('./models');
const session = require('express-session');


const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();

db.sequelize
  .sync({force: true}) // DROP EVERY EXISTING TABLE when force = true
  .then(() => {
    console.log("### DATABASE CONNECTED!!! ###");
  })
  .catch((err) => {
    console.error(err);
  });

app.use(
  session({ // Options for express-session
    secret: process.env.SECRET_KEY,
    store: new SequelizeStore({ // Options for connect-session-sequelize
      db: db.sequelize,
      tableName:"sessions"
    }),
    saveUninitialized: false,
    resave:false,
    proxy: false
  })
)

app.use(express.static(path.join(__dirname, "build")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


const wrapper = require('./utils/wrapper.js'); // async Wrapper

app.get("*", wrapper(async (req, res) => {
  res.sendFile(path.join(__dirname, "build/index.html"));
}));

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).end();
})

app.listen(process.env.PORT, () => {
  console.log("==================");
  console.log("Server Started!");
  console.log("==================");
}); 