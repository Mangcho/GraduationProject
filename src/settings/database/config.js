import mysql from "mysql2/promise";
import "../../settings/env/env.js";

export default db = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PW || 'password',
    database: process.env.DB_NAME || 'database',
    connectionLimit: process.env.DB_CONN_LIMIT || 8,
    dateStrings: true, // return DATE type
    multipleStatements: true
});