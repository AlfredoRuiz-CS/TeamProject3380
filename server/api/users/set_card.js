const userController = require("../controllers/userController");
const http = require("http");
const { dbInitializer } = require("./config/db");
const userController = require("./controllers/userController");

module.exports = async (req, res) => {
  try {
    const body = await getRequestBody(req);
    const { customerEmail, cardtype, cardnumber, cvv, expiration } = body;

    let addInfo = await userModel.createUserPaymentInfo(
      customerEmail,
      cardtype,
      cardnumber,
      cvv,
      expiration
    );
    res.writeHead(201, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        message: `Successfully added payment information for ${customerEmail}`,
      })
    );
  } catch (error) {
    res.writeHead(500, { " Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        status: "Failed to update user information",
        error: error.message,
      })
    );
  }
};
