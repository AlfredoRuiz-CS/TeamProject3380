const userController = require("../../controllers/userController");
const { setCorsHeaders } = require("../../lib/cors");

module.exports = async (req, res) => {
  setCorsHeaders(req, res);
  if (req.method === 'GET'){
    await userController.getAllCustomers(req, res);
  } else {
    res.writeHead(404, { 'Content-Type' : 'application/json' });
    res.end(JSON.stringify({ message: 'Route Not Found'}));
  }
};
