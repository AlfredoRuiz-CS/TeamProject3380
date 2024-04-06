const { pool } = require("../config/db");
const bcrypt = require("bcrypt");

async function register(email, fName, lName, phoneNumber, streetAddress, city, state, zipcode, password, accountType = 'customer', jobTitle = 'manager') {
  // validation
  if (!fName || !lName || !email || !phoneNumber || !streetAddress || !city || !state || !zipcode || !password) {
      throw Error('All fields must be filled');
  }

  // Determine the table based on the role
  const tableName = accountType === 'customer' ? 'customer' : 'employee';
  const [users] = await pool.query(`SELECT * FROM ${tableName} WHERE email = ?`, [email]);

  if (users.length > 0) {
      throw Error('Email already in use');
  }

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  
  // Insert the new user
  let query, queryParams;

  if (accountType === 'customer') {
      query = `INSERT INTO customer(email, fName, lName, phoneNumber, streetAddress, city, state, zipcode, password) 
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
      queryParams = [email, fName, lName, phoneNumber, streetAddress, city, state, zipcode, hash];
  } else { // role is 'employee'
      query = `INSERT INTO employee(email, fName, lName, phoneNumber, streetAddress, city, state, zipcode, empPassword, jobTitle) 
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
      queryParams = [email, fName, lName, phoneNumber, streetAddress, city, state, zipcode, hash, jobTitle];
  }

  const result = await pool.query(query, queryParams);
  return { email, accountType };
}


async function login(email, password) {
    
    let user;
    let accountType;

    // Check if user exists
    const [customers] = await pool.query(`
    SELECT * 
    FROM customer 
    WHERE email = ?`, [email]);
    if (customers.length > 0){
      user = customers[0];
      accountType = 'customer';
    } else {
      const [employees] = await pool.query(`
      SELECT * 
      FROM employee 
      WHERE email = ?`, [email]);
      if (employees.length > 0){
        user = employees[0];
        accountType = 'employee';
      }
    }

    if (!user) {
      throw Error('Incorrect email');
    }
  
    // Check if password matches
    const hashedPassword = user.password || user.empPassword;
    const match = await bcrypt.compare(password, hashedPassword.toString('utf8'));
    if (!match) {
      throw Error('Incorrect password');
    }
  
    return { email: user.email, fName: user.fName, lName: user.lName, phoneNumber: user.phoneNumber, streetAddress: user.streetAddress, city: user.city, state: user.state, zipcode: user.zipcode, accountType };
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
    WHERE customerEmail = ?`, [cardtype, cardnumber, cvv, expiration, customerEmail]);

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

async function updateUserEmail(currentEmail, newEmail){
  try {
    const [rows] = await pool.query(`
      UPDATE customer
      SET email = ? 
      WHERE email = ?`, [newEmail, currentEmail]);

    return rows;
  } catch (error) {
    console.log(error.message);
    throw error; 
  }
}

async function updateUserPassword(email, oldPassword, newPassword){
    // password validation
    // TODO

    try {
      const [users] = await pool.query(`
      SELECT password
      FROM customer
      WHERE email = ?`, [email]);

      const user = users[0];
      if (!user){
        throw Error('User not found');
      }

      const hashedPassword = user.password.toString('utf8');
      const match = await bcrypt.compare(oldPassword, hashedPassword);
      if (!match){
        throw Error('Your current password is incorrect');
      }

      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(newPassword, salt);

      const [rows] = await pool.query(`
      UPDATE customer
      SET password = ?
      WHERE email = ?`, [hash, email]);

      return rows;

    } catch (error) {
      console.log(error.message);
      throw error;
    }
}

async function updateUserPhone(email, newPhone){
  try{
    const [rows] = await pool.query(`
      UPDATE customer
      SET phoneNumber = ?
      where email = ?`, [newPhone, email]);

      return rows;

  } catch(error){
    console.log(error.message);
    throw error;
  }
}

async function updateUserAddress(email, streetAddress, city, state, zipcode){
  try{
    const [rows] = await pool.query(`
    UPDATE customer
    SET streetAddress = ?, city = ?, state = ?, zipcode = ?
    WHERE email = ?`, [streetAddress, city, state, zipcode, email]);

    return rows;

  } catch (error) {
    console.log(error.message);
    throw error;
  }
}

async function updateUserName(email, fName, lName){
  try{
    const [rows] = await pool.query(`
    UPDATE customer
    SET fName = ?, lName = ?
    WHERE email = ?`, [fName, lName, email]);

    return rows;

  } catch (error){
    console.log(error.message);
    throw error;
  }
}

// async function updateUserlName(email, lName){
//   try{
//     const [rows] = await pool.query(`
//     UPDATE customer
//     SET lName = ?
//     WHERE email = ?`, [lName, email]);

//     return rows;
    
//   } catch (error){
//     console.log(error.message);
//     throw error;
//   }
// }

module.exports = {
    register,
    login,
    findAllCustomers,
    getUserPaymentInfo,
    createUserPaymentInfo,
    updateUserPaymentInfo,
    updateUserEmail,
    updateUserPassword,
    updateUserPhone,
    updateUserAddress,
    updateUserName,
    // updateUserlName
}