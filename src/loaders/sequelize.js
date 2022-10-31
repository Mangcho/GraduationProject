//const db = require("./models");
export async function synchronize(db) {

    try {
        const response = await db.sequelize
            .sync({ alter: process.env.NODE_ENV == "development" ? true : false }) // DROP EVERY EXISTING TABLE when force = true / alter는 데이터는 그대로 냅둔다
        console.log("### DATABASE CONNECTED!!! ###");
    } catch (err) {
        console.error(err);
    }
}