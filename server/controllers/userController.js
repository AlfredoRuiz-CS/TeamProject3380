const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
const { parse } = require('querystring');

const createToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET, { expiresIn: '3d' });
};

const getRequestBody = (req) => {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      resolve(parse(body));
    });
    req.on('error', (err) => {
      reject(err);
    });
  });
};

const loginAuth = async (req, res) => {
  
  try {
    const body = await getRequestBody(req);
    const { email, password } = body;

    const user = await userModel.login(email, password);

    const token = createToken(user.customerID);

    res.writeHead(200, { 'Content-Type': 'application/json'});
    res.end(JSON.stringify({ email, token }));
  } catch (error) {
    res.writeHead(400, {' Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: error.message }));
  }
};

const registerAuth = async (req, res) => {
  
  try {
    const body = await getRequestBody(req);
    const { fName, lName, email, address, phoneNumber, password } = body;

    const user = await userModel.register(fName, lName, email, address, phoneNumber, password);

    const token = createToken(user.id);

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ email, token }));
  } catch (error) {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: error.message }));
  }
};

const getAllCustomers = async (req, res) => {

  try {
    const customers = await userModel.findAllCustomers();

    res.writeHead(200, { 'Content-Type' : 'application/json' })
    res.end(JSON.stringify(customers));
  } catch (error) {
    res.writeHead(400, { 'Content-Type' : 'application/json' })
    res.end(JSON.stringify({ error: error.message}))
  }
};

const getUserPaymentInfo = async (req, res) => {
  try {
    const body = await getRequestBody(req);
    const { email } = body;

    const paymentInfoQuery = await userModel.getUserPaymentInfo(email);
    if (!paymentInfoQuery){
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end("none");
    }

    let paymentInfo = paymentInfo[0];
    let expirationDate = `${paymentInfo.expiration.getMonth() + 1}-${paymentInfo.expiration.getDate()}-${paymentInfo.expiration.getFullYear()}`;
    paymentInfo.expiration = expirationDate;

    res.writeHead(200, { 'Content-Type' : 'application/json' });
    res.end(JSON.stringify(paymentInfo));

  } catch (error) {
    res.writeHead(500, {' Content-Type': 'application/json' });
    res.end(JSON.stringify({"status": "Could not retrieve payment information", "error" : error.message }));
  }
};

const createUserPaymentInfo = async (req, res) => {
  try {
    const body = await getRequestBody(req);
    const { customerEmail, cardtype, cardnumber, cvv, expiration } = body;

    let dateComponents = expiration.split('-');
    [dateComponents[0], dateComponents[1]] = [dateComponents[1], dateComponents[0]];
    dateComponents.reverse();
    expiration = dateComponents.join("-");

    let addInfo = await userModel.createUserPaymentInfo(customerEmail, cardtype, cardnumber, cvv, expiration);
    res.writeHead(201, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ "message": `Successfully added payment information for ${customerEmail}` }));
  } catch(error) {
    res.writeHead(500, {' Content-Type': 'application/json' });
    res.end(JSON.stringify({ "status": "Failed to update user information", "error": error.message }));
  }
}

const updateUserPaymentInfo = async (req, res) => {
  try {
    const body = await getRequestBody(req);
    const { customerEmail, cardtype, cardnumber, cvv, expiration } = body;

    cvv = parseInt(cvv, 10);

    let infoExists = await userModel.updateUserPaymentInfo(customerEmail, cardtype, cardnumber, cvv, expiration);
    if (!infoExists) {
        let newInfo = await userModel.createUserPaymentInfo(customerEmail, cardtype, cardnumber, cvv, expiration);
        res.writeHead(201, { 'Content-Type' : 'application/json' })
        res.end(JSON.stringify({ "message": `Successfully updated payment information for ${customerEmail}`}));
    }
    let newInfo = await userModel.updateUserPaymentInfo(customerEmail, cardtype, cardnumber, cvv, expiration);
    res.writeHead(201, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ "message": `Successfully updated payment information for ${customerEmail}` }));
  } catch (error) {
    console.log(error);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ "status": "Failed to update user information", "error": error.message }));
  }
};


module.exports = { 
  registerAuth, 
  loginAuth, 
  getAllCustomers,
  getUserPaymentInfo,
  createUserPaymentInfo,
  updateUserPaymentInfo 
};