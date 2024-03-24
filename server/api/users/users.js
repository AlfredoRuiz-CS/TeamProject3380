const userController = require("../controllers/userController");
const http = require("http");
const { dbInitializer } = require("./config/db");
const userController = require("./controllers/userController");
const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");

module.exports = async (req, res) => {
  try {
    const customers = await userModel.findAllCustomers();

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(customers));
  } catch (error) {
    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: error.message }));
  }
};
