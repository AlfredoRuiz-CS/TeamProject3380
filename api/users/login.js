const userController = require("../../controllers/userController");
const { setCorsHeaders } = require("../../lib/cors");

module.exports = async (req, res) => {
  setCorsHeaders(req, res);
   // Handle OPTIONS method by ending the request after setting CORS headers.
   if (req.method === "OPTIONS") {
    res.writeHead(204); // Use writeHead instead of status to stay consistent.
    res.end();
    return;
  }

  if (req.method === "POST") {
    await userController.loginAuth(req, res);
  } else {
    res.writeHead(404, { 'Content-Type' : 'application/json' });
    res.end(JSON.stringify({ message: 'Route Not Found'}));
  }
};
