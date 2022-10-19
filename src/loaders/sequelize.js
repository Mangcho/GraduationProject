//const db = require("./models");
export async function synchronize(db) {

    try {
        const response = await db.sequelize
            .sync({ force: process.env.NODE_ENV === "development" ? true : false }) // DROP EVERY EXISTING TABLE when force = true
        console.log("### DATABASE CONNECTED!!! ###");
    } catch (err) {
        console.error(err);
    }
}