const notificationsModel = require("../models/notificationsModel");

const getNotifications = async (req, res) => {
    try {
        const notifications = await notificationsModel.getNotifications();

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(notifications));
    } catch (error) {
        res.writeHead(500,{ 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ "error": error.message }));
    }
}

module.exports = { getNotifications };