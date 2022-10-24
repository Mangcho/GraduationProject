// Dependencies import
import express from "express";
import "./settings/env/env.js"; //dotenv
import path from "path";
import { fileURLToPath } from "url"; // dirname
import { db } from "./models/index.js";
import session from "express-session";
import SequelizeStore from "connect-session-sequelize";

// Router import
import { authRouter } from "./routes/api/auth.js";
import { piRouter } from "./routes/pi.js";
import { graphRouter } from "./routes/api/graph.js";

// Loaders import
import { synchronize } from "./loaders/sequelize.js";
import { Test } from "./loaders/test.js";

// utils import
import { wrapper } from "./utils/wrapper.js";

// dirname, filename 생성
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sequelizeSession = SequelizeStore(session.Store); // 반드시 질문 cjs to ESM
const app = express();

// session set
app.use(
  session({
    // Options for express-session
    httpOnly: true,
    secret: process.env.SECRET_KEY,
    saveUninitialized: false,
    resave: false,
    proxy: false,
    store: new sequelizeSession({
      // Options for connect-session-sequelize // 반드시 질문 cjs to ESM
      db: db.sequelize,
      table: "sessions",
      checkExpirationInterval: 15 * 60 * 1000, // 15분
      expiration: 60 * 60 * 1000 // 한시간
    })
  })
);

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routings
app.use("/api/auth", authRouter);
app.use("/api/graph", graphRouter);
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
// DB load and set
await synchronize(db);

// Test code
const TestService = new Test();
if (process.env.NODE_ENV == 'development') {
  TestService.syncData();
}
