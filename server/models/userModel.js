const { pool } = require("../config/db");
const bcrypt = require("bcrypt");

async function register (fName, lName, email, address, phoneNumber, password){
    // validation
    if (!fName || ! lName || !email || !address || !phoneNumber || !password) {
        throw Error('All fields must be filled')
    }
    // if (!validator.isEmail(email)) {
    //     throw Error('Email not valid')
    // }
    // if (!validator.isStrongPassword(password)) {
    //     throw Error('Password not strong enough')
    // }

    // Check if user exists
    const [users] = await pool.query('SELECT * FROM customerProfile WHERE email = ?', [email]);
    if (users.length > 0) {
        throw Error('Email already in use');
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    
    // Insert the new user
    const result = await pool.query('INSERT INTO customerProfile (email, password) VALUES (?, ?)', [email, hash]);

    return { id: result[0].insertId, email };
}

async function login(email, password) {
    // Check if user exists
    const [users] = await pool.query('SELECT * FROM customerProfile WHERE email = ?', [email]);
    const user = users[0];
    if (!user) {
      throw Error('Incorrect email');
    }
  
    // Check if password matches
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw Error('Incorrect password');
    }
  
    return user;
  }
  
module.exports = {
    register,
    login
}