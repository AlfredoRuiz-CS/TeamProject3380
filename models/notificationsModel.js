const { pool } = require("../config/db");

async function getNotifications () {
    try {

        const [notifications] = await pool.query(`Select * from notifications`);
        console.log(notifications);
        return notifications;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports = { getNotifications };