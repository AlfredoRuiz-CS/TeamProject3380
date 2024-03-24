const userController = require("../controllers/userController");
const http = require("http");
const { dbInitializer } = require("./config/db");
const userController = require("./controllers/userController");

module.exports = async (req, res) => {
  try {
    const body = await getRequestBody(req);
    const { customerEmail, cardtype, cardnumber, cvv, expiration } = body;

    cvv = parseInt(cvv, 10);

    let infoExists = await userModel.updateUserPaymentInfo(
      customerEmail,
      cardtype,
      cardnumber,
      cvv,
      expiration
    );
    if (!infoExists) {
      let newInfo = await userModel.createUserPaymentInfo(
        customerEmail,
        cardtype,
        cardnumber,
        cvv,
        expiration
      );
      res.writeHead(201, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          message: `Successfully updated payment information for ${customerEmail}`,
        })
      );
    }
    let newInfo = await userModel.updateUserPaymentInfo(
      customerEmail,
      cardtype,
      cardnumber,
      cvv,
      expiration
    );
    res.writeHead(201, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        message: `Successfully updated payment information for ${customerEmail}`,
      })
    );
  } catch (error) {
    console.log(error);
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        status: "Failed to update user information",
        error: error.message,
      })
    );
  }
};
