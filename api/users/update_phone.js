const userController = require("../../controllers/userController");
const { setCorsHeaders } = require("../../lib/cors");

module.exports = async (req, res) => {
  setCorsHeaders(req, res);
  if (req.method === 'POST'){
    await userController.updateUserPhone(req, res);
  } else {
    res.writeHead(404, { 'Content-Type' : 'application/json' });
    res.end(JSON.stringify({ message: 'Route Not Found'}));
  }
};
