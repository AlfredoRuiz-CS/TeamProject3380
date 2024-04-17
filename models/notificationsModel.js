const { pool } = require("../config/db");

async function getNotifications () {
    try {

        const [notifications] = await pool.query(`
        SELECT n.message, p.productID, p.productName
        FROM notifications n
        INNER JOIN product p 
        ON p.productID = CAST(SUBSTRING_INDEX(SUBSTRING_INDEX(n.message, ' ', 3), ' ', -1) AS UNSIGNED)`);

        return notifications;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports = { getNotifications };