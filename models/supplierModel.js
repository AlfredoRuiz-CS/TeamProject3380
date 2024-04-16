const { pool } = require("../config/db");

async function getAllSuppliers() {
    try {
        const [rows] = await pool.query(`
        SELECT *
        FROM supplier s
        WHERE s.active = 1`);

        return rows;

    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function insertSupplier(name, phoneNumber, streetAddress, city, state, zipcode){
    try {
        const [result] = await pool.query(`
           INSERT INTO supplier(name, phoneNumber, streetAddress, city, state, zipcode) 
           VALUES (?, ?, ?, ?, ?, ?)
           `, [name, phoneNumber, streetAddress, city, state, zipcode]);

        return result;

    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports = {
    getAllSuppliers,
    insertSupplier
}
