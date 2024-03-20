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
    const [users] = await pool.query(`
    SELECT * 
    FROM customer 
    WHERE email = ?`, [email]);

    if (users.length > 0) {
        throw Error('Email already in use');
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    
    // Insert the new user
    const result = await pool.query(`
    INSERT INTO customer(email, password) 
    VALUES (?, ?)`, [email, hash]);

    return { id: result[0].insertId, email };
}

async function login(email, password) {
    // Check if user exists
    const [users] = await pool.query(`
    SELECT * 
    FROM customer 
    WHERE email = ?`, [email]);
    const user = users[0];
    if (!user) {
      throw Error('Incorrect email');
    }
  
    // Check if password matches
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw Error('Incorrect password');
    }
  
    return { id: user.id, email: user.email };
  }

async function findAllCustomers() {

  try {
    const [rows] = await pool.query(`
    SELECT * 
    FROM customer`);
    return rows;

  } catch (error){
    console.log(error.message);
    throw error;
  }
}

  // async function findUserbyEmail(email){
  //   try { 
  //       const [rows] = await pool.query('SELECT email FROM customer as c WHERE c.email = ?', [email]);
  //       return rows[0];
  //   } catch (error){
  //     console.log(error.message);
  //     throw error;
  //   }
  // }

async function getUserPaymentInfo(email){
  try {
    const [rows] = await pool.query(`
    SELECT p.cardtype, p.cardnumber, p.cvv, p.expiration 
    FROM paymentInfo p
    where p.customerEmail = ?`, [email]);
    return rows;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
}

async function createUserPaymentInfo(customerEmail, cardtype, cardnumber, cvv, expiration) {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    const [rows] = await connection.execute(`
    INSERT INTO paymentInfo (customerEmail, cardtype, cardnumber, cvv, expiration)
    VALUES
    (?,?,?,?,?) 
    `, [customerEmail, cardtype, cardnumber, cvv, expiration]);

    await connection.commit();
    return rows;

  } catch (error){
    console.log(error.message);
    throw error;

  } finally {
    await connection.release();
  }
}

async function updateUserPaymentInfo(customerEmail, cardtype, cardnumber, cvv, expiration){
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    const [rows] = await connection.execute(`
    UPDATE paymentInfo 
    SET cardtype = ?, cardnumber = ?, cvv = ?, expiration = ? 
    WHERE customerEmail`, [cardtype, cardnumber, cvv, expiration, customerEmail]);

    await connection.commit();

    return rows;
  } catch (error) {

    await connection.rollback();

    console.log(error.message);

    throw error;
  } finally {

    await connection.release();
  }
}

module.exports = {
    register,
    login,
    findAllCustomers,
    getUserPaymentInfo,
    createUserPaymentInfo,
    updateUserPaymentInfo
}