const { pool } = require('../config/db');

async function getAllProducts() {
    try {
        const [rows] = await pool.query(`
        SELECT *
        FROM product`);

        return rows;

    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports = {
    getAllProducts
}