import mysql from "mysql2/promise";
import "../../settings/env/env.js";

export default db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PW,
    database: process.env.DB_NAME,
    connectionLimit: process.env.DB_CONN_LIMIT,
    dateStrings: true, // return DATE type
    multipleStatements: true
});