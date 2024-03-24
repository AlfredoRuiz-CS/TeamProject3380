const userController = require("../../controllers/userController");
const { setCorsHeaders } = require("../../lib/cors");

module.exports = async (req, res) => {
  if(setCorsHeaders(req, res)) return;
  if (req.method === 'POST'){
    await userController.updateUserPaymentInfo(req, res);
  } else {
    res.writeHead(404, { 'Content-Type' : 'application/json' });
    res.end(JSON.stringify({ message: 'Route Not Found'}));
  }
};