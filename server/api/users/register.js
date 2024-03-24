const userController = require("../controllers/userController");
const http = require("http");
const { dbInitializer } = require("./config/db");
const userController = require("./controllers/userController");
const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");

module.exports = async (req, res) => {
  try {
    const body = await getRequestBody(req);
    console.log(body);
    const {
      fName,
      lName,
      email,
      phoneNumber,
      streetAddress,
      city,
      state,
      zipcode,
      password,
    } = body;
    console.log(
      fName,
      lName,
      email,
      phoneNumber,
      streetAddress,
      city,
      state,
      zipcode,
      password
    );

    const user = await userModel.register(
      email,
      fName,
      lName,
      phoneNumber,
      streetAddress,
      city,
      state,
      zipcode,
      password
    );

    const token = createToken(user.email);

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        email,
        fName,
        lName,
        phoneNumber,
        streetAddress,
        city,
        state,
        zipcode,
        token,
      })
    );
  } catch (error) {
    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: error.message }));
  }
};
