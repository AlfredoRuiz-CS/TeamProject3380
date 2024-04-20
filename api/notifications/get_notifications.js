const notificationsController = require("../../controllers/notificationsController");
const { setCorsHeaders } = require("../../lib/cors");

module.exports = async (req, res) => {
  setCorsHeaders(req, res);
  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end.end(JSON.stringify(notifications));
    return;
  }
  
  if (req.method === 'GET'){
    await notificationsController.getNotifications(req, res);
  } else {
    res.writeHead(404, { 'Content-Type' : 'application/json' });
    res.end(JSON.stringify({ message: 'Route Not Found'}));
  }
};