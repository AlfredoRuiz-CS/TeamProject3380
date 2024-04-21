const userController = require("../../controllers/userController");
const { setCorsHeaders } = require("../../lib/cors");
const { verifyToken } = require("../../utils/auth");

module.exports = async (req, res) => {
  setCorsHeaders(req, res);
  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }
  if (req.method === 'GET'){
    try {
      const decoded = await verifyToken(req);

      req.email = decoded.email;

      await userController.getUserPaymentInfo(req, res);
    } catch (error) {
      res.writeHead(401, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Unauthorized' }));
    }
  } else {
    res.writeHead(404, { 'Content-Type' : 'application/json' });
    res.end(JSON.stringify({ message: 'Route Not Found'}));
  }
};