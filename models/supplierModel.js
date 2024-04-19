const { pool } = require("../config/db");

async function getAllSuppliers() {
    try {

        const [rows] = await pool.query(`
        SELECT s.name, s.phoneNumber, s.streetAddress, s.city, s.state, s.zipcode,
            GROUP_CONCAT (p.productName ORDER BY p.productName SEPARATOR ', ') AS products
        FROM supplier s
        INNER JOIN product p ON p.supplier = s.name
        WHERE s.active=1
        GROUP BY s.name, s.phoneNumber, s.streetAddress, s.city, s.state, s.zipcode`);
        

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

async function removeSupplier(name){
    try{
        const result = await pool.query(`
        UPDATE supplier
        SET active=?
        WHERE name=? AND active=?`,[0,name,1]);

        if (result[0].affectedRows === 0) {
            return null;
        }

        return result;
    } catch (error){
        console.log(error);
        throw error;
    }
}

module.exports = {
    getAllSuppliers,
    insertSupplier,
    removeSupplier
}
