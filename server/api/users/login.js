const userController = require("../controllers/userController");
const http = require("http");
const { dbInitializer } = require("./config/db");
const userController = require("./controllers/userController");

module.exports = async (req, res) => {
  if (req.method === "POST") {
    await userController.loginAuth(req, res);
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
};
