// const userModel = require("../models/userModel");

module.exports = async (req, res) => {
  if (req.method === 'GET'){
    dbInitializer(req, res);
  } else {
    res.writeHead(404, { 'Content-Type' : 'application/json' });
    res.end(JSON.stringify({ message: 'Route Not Found'}));
  }
};
