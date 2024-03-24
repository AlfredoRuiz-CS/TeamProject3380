const userModel = require("../models/userModel");

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
