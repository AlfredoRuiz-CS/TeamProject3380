const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');

const createToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET, { expiresIn: '3d' });
};

const loginAuth = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.login(email, password);

    const token = createToken(user.id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const registerAuth = async (req, res) => {
  const { fName, lName, email, address, phoneNumber, password } = req.body;

  try {
    const user = await userModel.register(fName, lName, email, address, phoneNumber, password);

    const token = createToken(user.id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllCustomers = async (req, res) => {
  try {
    const customers = await userModel.findAllCustomers();

    res.writeHead(200, { 'Content-Type' : 'application/json' })
    res.end(JSON.stringify(customers));
  } catch (error) {
    console.log(error);
    res.writeHead(400, { 'Content-Type' : 'application/json' })
    res.end(JSON.stringify({ error: error.message}))
  }
}



module.exports = { registerAuth, loginAuth, getAllCustomers };