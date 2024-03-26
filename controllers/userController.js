const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
const { setCorsHeaders } = require('../lib/cors');

const createToken = (email) => {
  return jwt.sign({ email }, process.env.SECRET, { expiresIn: '1d' });
};

const getRequestBody = (req) => {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        // Parse the body string as JSON
        const parsedBody = JSON.parse(body);
        resolve(parsedBody);
      } catch (error) {
        reject(error);
      }
    });
    req.on('error', (err) => {
      reject(err);
    });
  });
};

const registerAuth = async (req, res) => {
  
  try {
    const body = await getRequestBody(req);
    console.log(body);
    const { fName, lName, email, phoneNumber, streetAddress, city, state, zipcode, password, role, jobTitle } = body;
    console.log(fName, lName, email, phoneNumber, streetAddress, city, state, zipcode, password, role);

    const user = await userModel.register(email, fName, lName, phoneNumber, streetAddress, city, state, zipcode, password, role, jobTitle);

    const token = createToken(user.email);

    setCorsHeaders(req, res);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ email, fName, lName, phoneNumber, streetAddress, city, state, zipcode, token, role }));
  } catch (error) {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: error.message }));
  }
};

const loginAuth = async (req, res) => {
  
  try {
    const body = await getRequestBody(req);
    const { email, password } = body;

    const user = await userModel.login(email, password);

    const token = createToken(user.email);

    setCorsHeaders(req, res);
    res.writeHead(200, { 'Content-Type': 'application/json'});
    res.end(JSON.stringify({ 
      email: user.email,
      fName: user.fName,
      lName: user.lName,
      phoneNumber: user.phoneNumber,
      streetAddress: user.streetAddress,
      city: user.city,
      state: user.state,
      zipcode: user.zipcode,
      role,
      token 
    }));
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

const updateUserEmail = async (req, res) => {
  try {
    const body = await getRequestBody(req);
    const { currentEmail, newEmail } = body;

    const emailQuery = await userModel.updateUserEmail(currentEmail, newEmail);

    res.writeHead(201, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ "message": `Successfully updated email - ${newEmail}` }));
  } catch (error){
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ "status": "Failed to update user email", "error" : error.message }));
  }
};

const updateUserPassword = async (req, res) => {
  try{
    const body = await getRequestBody(req);
    const { email, oldPassword, newPassword } = body;

    const updatePassword = await userModel.updateUserPassword(email, oldPassword, newPassword);
    
    res.writeHead(201, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ "message": `Successfully updated password for - ${email}` }));
  } catch (error){
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ "status": "Failed to update password", "error" : error.message }));
  }
}

const updateUserPhone = async (req, res) => {
  try {
    const body = getRequestBody(req);
    const { email, newPhone } = body;
    
    const updatePhone = await userModel.updateUserPhone(email, newPhone);

    res.writeHead(201, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ "message": `Successfully updated phone for - ${email}` }));

  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ "status": "Failed to update phone number", "error" : error.message }));
  }
}

const updateUserAddress = async (req, res) => {
  try {
    const body = getRequestBody(req);
    const { email, streetAddress, city, state, zipcode } = body;

    const updateUserAddress = await userModel.updateUserAddress(email, streetAddress, city, state, zipcode);

    res.writeHead(201, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ "message": `Successfully updated phone for - ${email}` }));

  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ "status": "Failed to update address", "error" : error.message }));
  }

}

const updateUserName = async (req, res) => {
  try {
    const body = getRequestBody(req);
    const { email, fName, lName } = body;

    const updateUserName = await userModel.updateUserName(email, fName, lName);

    res.writeHead(201, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ "message": `Successfully updated name for - ${email}` }));

  } catch (error){
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ "status": "Failed to update name", "error" : error.message }));
  }
}

// const updateUserlName = async (req, res) => {
//   try {
//     const body = getRequestBody(req);
//     const { email, lName } = body;

//     const updateUserfName = await userModel.updateUserfName(email, lName);

//     res.writeHead(201, { 'Content-Type': 'application/json' });
//     res.end(JSON.stringify({ "message": `Successfully updated last name for - ${email}` }));

//   } catch (error){
//     res.writeHead(500, { 'Content-Type': 'application/json' });
//     res.end(JSON.stringyf({ "status": "Failed to update address", "error" : error.message }));
//   }
// }

module.exports = { 
  registerAuth, 
  loginAuth, 
  getAllCustomers,
  getUserPaymentInfo,
  createUserPaymentInfo,
  updateUserPaymentInfo,
  updateUserEmail,
  updateUserPassword,
  updateUserPhone,
  updateUserAddress,
  updateUserName 
};