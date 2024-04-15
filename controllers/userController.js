const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
const { getRequestBody } = require('../lib/requestBodyParser');

const createToken = (email) => {
  return jwt.sign({ email }, process.env.SECRET, { expiresIn: '1d' });
};

const registerAuth = async (req, res) => {
  
  try {
    const body = await getRequestBody(req);
    console.log(body);
    const { fName, lName, email, phoneNumber, streetAddress, city, state, zipcode, password } = body;
    console.log(fName, lName, email, phoneNumber, streetAddress, city, state, zipcode, password);

    const user = await userModel.register(email, fName, lName, phoneNumber, streetAddress, city, state, zipcode, password);

    const token = createToken(user.email);

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ email: user.email, fName: fName, lName: lName, phoneNumber: phoneNumber, streetAddress: streetAddress, city: city, state: state, zipcode: zipcode, token, accountType: user.accountType }));
  } catch (error) {
    if (!res.headersSent) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
    }
    res.end(JSON.stringify({ error: error.message }));
  }
};

const loginAuth = async (req, res) => {
  
  try {
    const body = await getRequestBody(req);
    console.log(body);
    const { email, password } = body;
    console.log(email, password);

    const user = await userModel.login(email, password);
    console.log(user);

    const token = createToken(user.email);

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
      accountType: user.accountType,
      isMember: user.isMember,
      token
    }));
  } catch (error) {
    if (!res.headersSent) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
    }
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
    const email = req.email;

    const paymentInfoQuery = await userModel.getUserPaymentInfo(email);
    if (!paymentInfoQuery){
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end("none");
    }
    console.log(paymentInfoQuery);
    // let paymentInfo = paymentInfo[0]; //Should it be paymentInfoQuery
    // let expirationDate = `${paymentInfo.expiration.getMonth() + 1}-${paymentInfo.expiration.getDate()}-${paymentInfo.expiration.getFullYear()}`;
    // paymentInfo.expiration = expirationDate;

    res.writeHead(200, { 'Content-Type' : 'application/json' });
    res.end(JSON.stringify(paymentInfoQuery));

  } catch (error) {
    res.writeHead(500, {' Content-Type': 'application/json' });
    res.end(JSON.stringify({"status": "Could not retrieve payment information", "error" : error.message }));
  }
};

const createUserPaymentInfo = async (req, res) => {
  try {
    const body = await getRequestBody(req);
    const { cardType, cardNumber, expirationDate, cvv, nameOnCard } = body;
    console.log( cardType, cardNumber, expirationDate, cvv, nameOnCard);
    const customerEmail = req.email;
    console.log(customerEmail);

    let addInfo = await userModel.createUserPaymentInfo(customerEmail, cardType, cardNumber, cvv, expirationDate, nameOnCard);
    res.writeHead(201, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ addInfo, "message": `Successfully added payment information for ${customerEmail}` }));

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
    const { currentEmail, email: newEmail } = body;

    const emailQuery = await userModel.updateUserEmail(currentEmail, newEmail);

    res.writeHead(201, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ "message": `Successfully updated email - ${newEmail}`, email: newEmail }));
  } catch (error){
    if (!res.headersSent) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
    }
    res.end(JSON.stringify({ "status": "Failed to update user email", "error" : error.message }));
  }
};

const updateUserPassword = async (req, res) => {
  try{
    const body = await getRequestBody(req);
    const { currentEmail: email, oldPassword, newPassword } = body;

    const updatePassword = await userModel.updateUserPassword(email, oldPassword, newPassword);
    
    res.writeHead(201, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ "message": `Successfully updated password for - ${email}` }));
  } catch (error){
    if (!res.headersSent) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
    }
    res.end(JSON.stringify({ "status": "Failed to update password", "error" : error.message }));
  }
}

const updateUserPhone = async (req, res) => {
  try {
    const body = await getRequestBody(req);
    const { currentEmail: email , phone: newPhone } = body;
    
    const updatePhone = await userModel.updateUserPhone(email, newPhone);

    res.writeHead(201, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ "message": `Successfully updated phone for - ${email}`, phoneNumber: newPhone}));

  } catch (error) {
    if (!res.headersSent) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
    }
    res.end(JSON.stringify({ "status": "Failed to update phone number", "error" : error.message }));
  }
}

const updateUserAddress = async (req, res) => {
  try {
    const body = await getRequestBody(req);
    const { currentEmail: email, street: streetAddress, city, state, zip: zipcode } = body;

    const updateUserAddress = await userModel.updateUserAddress(email, streetAddress, city, state, zipcode);

    res.writeHead(201, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ "message": `Successfully updated phone for - ${email}`, streetAddress: streetAddress, city: city, state: state, zipcode: zipcode }));

  } catch (error) {
    if (!res.headersSent) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
    }
    res.end(JSON.stringify({ "status": "Failed to update address", "error" : error.message }));
  }

}

const updateUserName = async (req, res) => {
  try {
    const body = await getRequestBody(req);
    const { firstName: fName, lastName: lName } = body;

    const email = req.email;

    const updateUserName = await userModel.updateUserName(email, fName, lName);

    res.writeHead(201, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ "message": `Successfully updated name for - ${email}`, fName: fName, lName: lName }));

  } catch (error){
    if (!res.headersSent) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
    }
    res.end(JSON.stringify({ "status": "Failed to update name", "error" : error.message }));
  }
}

const findUserbyEmail = async (req, res) => {
  try {
    const email = req.email;

    const user = await userModel.findUserbyEmail(email);

    if (user){
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ "message": "User allowed to visit route" }));
    } else {
      throw new Error('User not found or inactive');
    }
    
  } catch (error) {
    res.writeHead(400, { 'Content-Type' : 'application/json' })
    res.end(JSON.stringify({ error: error.message}))
  }
}

const deleteUser = async (req, res) => {
  try {
    const email = req.email;

    const paymentDelete = await userModel.deletePaymentMethod(email);

    res.writeHead(201, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ "message": `Successfully deleted user - ${email}` }));

  } catch (error) {
    res.writeHead(500, { 'Content-Type' : 'application/json' })
    res.end(JSON.stringify({ error: error.message}))
  }
}

const deletePaymentMethod = async (req, res) => {
  try {
    const body = await getRequestBody(req);
    const { cardnumber } = body;
    const email = req.email;

    const paymentDelete = await userModel.deletePaymentMethod(email, cardnumber);

    res.writeHead(201, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ "message": `Successfully deleted payment method ${cardnumber} for - ${email}` }));

  } catch (error) {
    res.writeHead(500, { 'Content-Type' : 'application/json' })
    res.end(JSON.stringify({ error: error.message}))
  }
}

module.exports = { 
  registerAuth, 
  loginAuth, 
  getAllCustomers,
  findUserbyEmail,
  getUserPaymentInfo,
  createUserPaymentInfo,
  updateUserPaymentInfo,
  updateUserEmail,
  updateUserPassword,
  updateUserPhone,
  updateUserAddress,
  updateUserName,
  deleteUser,
  deletePaymentMethod
};