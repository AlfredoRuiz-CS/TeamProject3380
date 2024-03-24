const userController = require("../controllers/userController");
const http = require("http");
const { dbInitializer } = require("./config/db");
const userController = require("./controllers/userController");
const { pool } = require("../config/db");

module.exports = async (req, res) => {
  try {
    const body = await getRequestBody(req);
    const { email, oldPassword, newPassword } = body;

    const updatePassword = await userModel.updateUserPassword(
      email,
      oldPassword,
      newPassword
    );

    res.writeHead(201, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        message: `Successfully updated password for - ${email}`,
      })
    );
  } catch (error) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        status: "Failed to update password",
        error: error.message,
      })
    );
  }
};
