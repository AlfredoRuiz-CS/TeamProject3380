const userController = require("../controllers/userController");
const http = require("http");
const { dbInitializer } = require("./config/db");
const userController = require("./controllers/userController");
const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");

module.exports = async (req, res) => {
  try {
    const body = getRequestBody(req);
    const { email, newPhone } = body;

    const updatePhone = await userModel.updateUserPhone(email, newPhone);

    res.writeHead(201, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({ message: `Successfully updated phone for - ${email}` })
    );
  } catch (error) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        status: "Failed to update phone number",
        error: error.message,
      })
    );
  }
};
