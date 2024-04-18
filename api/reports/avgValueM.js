const reportController = require("../../controllers/reportController");
const { setCorsHeaders } = require("../../lib/cors");

module.exports = async (req, res) => {
  setCorsHeaders(req, res);
  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }
  if (req.method === 'GET'){
    await reportController.getAvgPurchaseValueM(req, res);
  } else {
    res.writeHead(404, { 'Content-Type' : 'application/json' });
    res.end(JSON.stringify({ message: 'Route Not Found'}));
  }
};