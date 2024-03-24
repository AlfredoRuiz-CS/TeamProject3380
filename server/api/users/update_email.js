const userController = require("../controllers/userController");
const http = require("http");
const { dbInitializer } = require("./config/db");
const userController = require("./controllers/userController");

module.exports = async (req, res) => {
  try {
    const body = await getRequestBody(req);
    const { currentEmail, newEmail } = body;

    const emailQuery = await userModel.updateUserEmail(currentEmail, newEmail);

    res.writeHead(201, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({ message: `Successfully updated email - ${newEmail}` })
    );
  } catch (error) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        status: "Failed to update user email",
        error: error.message,
      })
    );
  }
};
