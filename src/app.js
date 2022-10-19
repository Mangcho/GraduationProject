// Dependencies import
import express from "express";
import "./settings/env/env.js"; //dotenv
import path from "path";
import { fileURLToPath } from "url"; // dirname
import { db } from "./models/index.js";
import { synchronize } from "./loaders/sequelize.js";
import session from "express-session";
import SequelizeStore from "connect-session-sequelize";

// Router import
import { authRouter } from "./routes/api/auth.js";
import { piRouter } from "./routes/pi.js";
import { graphRouter } from "./routes/api/graph.js";

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
    secret: process.env.SECRET_KEY,
    store: new sequelizeSession({
      // Options for connect-session-sequelize // 반드시 질문 cjs to ESM
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
