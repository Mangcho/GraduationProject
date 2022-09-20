const express = require('express');
require('dotenv').config()
const path = require('path');
const db = require('./models');


const app = express();
db.sequelize
  .sync()
  .then(() => {
    console.log("데이터베이스 연결됨.");
  })
  .catch((err) => {
    console.error(err);
  });



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