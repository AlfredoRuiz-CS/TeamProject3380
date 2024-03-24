const userController = require("../controllers/userController");
const http = require("http");
const { dbInitializer } = require("./config/db");
const userController = require("./controllers/userController");

module.exports = async (req, res) => {
  try {
    const body = await getRequestBody(req);
    const { email } = body;

    const paymentInfoQuery = await userModel.getUserPaymentInfo(email);
    if (!paymentInfoQuery) {
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("none");
    }

    let paymentInfo = paymentInfo[0];
    let expirationDate = `${paymentInfo.expiration.getMonth() + 1}-${paymentInfo.expiration.getDate()}-${paymentInfo.expiration.getFullYear()}`;
    paymentInfo.expiration = expirationDate;

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(paymentInfo));
  } catch (error) {
    res.writeHead(500, { " Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        status: "Could not retrieve payment information",
        error: error.message,
      })
    );
  }
};
