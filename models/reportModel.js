const { pool } = require("../config/db");

async function generateReport(startDate, endDate) {
    try {
        const [purchaseRes] = await pool.query(`
            SELECT SUM(p.total) AS totalPurchases
            FROM purchaseOrder p
            WHERE p.orderDate BETWEEN ? AND ?`, [startDate, endDate]);

        const [refundRes] = await pool.query(`
            SELECT SUM(r.amount) AS totalRefund
            FROM refund r
            WHERE r.refundDate BETWEEN ? AND ?`, [startDate, endDate]);

        const totalPurchases = purchaseRes[0] ? purchaseRes[0].totalPurchases : 0; // Default to 0 if null
        const totalRefund = refundRes[0] ? refundRes[0].totalRefund : 0; // Default to 0 if null
        const total = totalPurchases - totalRefund;
        // Combine into one object
        const result = {
            totalPurchases: totalPurchases || 0, // Default to 0 if undefined
            totalRefund: totalRefund || 0, // Default to 0 if undefined
            netAmount: total.toFixed(2)
        };

        return result;
    } catch (error) {
        console.log(error.message);
        throw error;
    }
}

async function soldProducts(startDate, endDate) {
    try {
        const [res] = await pool.query(`
        SELECT categName, p.productName, 
        SUM(ol.quantity) AS totalQuantitySold,
        SUM(ol.totalAmount) AS totalGain
        FROM orderLine ol
        JOIN purchaseOrder pu ON ol.orderID = pu.orderID
        JOIN product p ON p.productID=ol.productID
        JOIN category c on c.categoryID = p.categoryID
        WHERE ol.active=1 AND pu.orderDate BETWEEN ? AND ?
        GROUP BY p.productID, p.productName
        ORDER BY totalQuantitySold DESC`, [startDate, endDate]);

        // const [res1] = await pool.query(`
        // SELECT categName, p.productName,
        // SUM(ol.quantity) AS totalQuantitySold,
        // `)

        return res;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function refundedProduct(startDate, endDate) {
    try {
        const [res] = await pool.query(`
        SELECT categName, p.productName, 
        SUM(ol.quantity) AS totalQuantityReturned,
        SUM(ol.totalAmount) AS totalLoss
        FROM orderLine ol
        JOIN purchaseOrder pu ON ol.orderID = pu.orderID
        JOIN product p ON p.productID=ol.productID
        JOIN category c on c.categoryID = p.categoryID
        WHERE ol.active=0 AND pu.orderDate BETWEEN ? AND ?
        GROUP BY p.productID, p.productName
        ORDER BY totalQuantityReturned DESC`, [startDate, endDate]);

        return res;
    } catch (error) {
        console.log(error);
        throw error;
    }
}


async function addNewProductToInventory(productData) {
    try {
        // Insert a new product into the inventory
        const insertQuery = `
            INSERT INTO inventory (productID, supplierID, quantity, purchasePrice, retailPrice)
            VALUES (?, ?, ?, ?, ?)`;

        const { productID, supplierID, quantity, purchasePrice, retailPrice } = productData;

        await pool.query(insertQuery, [productID, supplierID, quantity, purchasePrice, retailPrice]);

        return { success: true, message: "Product added to inventory successfully." };
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function getTotalInventory() {
    try {
        const [result] = await pool.query(`
            SELECT SUM(quantity) AS totalInventory
            FROM inventory
        `);

        return result[0].totalInventory || 0;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
// rexamine if still useful
async function getInventoryByProduct(productId) {
    try {
        const [result] = await pool.query(`
            SELECT * 
            FROM inventory
            WHERE productID = ?
        `, [productId]);

        return result;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function getInventoryByWeek(startDate, endDate, productId = null) {
    try {
        let query = `
            SELECT * 
            FROM inventory
            WHERE WEEK(date_column) BETWEEN WEEK(?) AND WEEK(?)
        `;

        const params = [startDate, endDate];

        if (productId) {
            query += ` AND productID = ?`;
            params.push(productId);
        }

        const [result] = await pool.query(query, params);
        return result;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function getInventoryByDay(date, productId = null) {
    try {
        let query = `
            SELECT * 
            FROM inventory
            WHERE DATE(date_column) = ?
        `;

        const params = [date];

        if (productId) {
            query += ` AND productID = ?`;
            params.push(productId);
        }

        const [result] = await pool.query(query, params);
        return result;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function getInventoryByMonth(month, year, productId = null) {
    try {
        let query = `
            SELECT * 
            FROM inventory
            WHERE MONTH(date_column) = ? AND YEAR(date_column) = ?
        `;

        const params = [month, year];

        if (productId) {
            query += ` AND productID = ?`;
            params.push(productId);
        }

        const [result] = await pool.query(query, params);
        return result;
    } catch (error) {
        console.error(error);
        throw error;
    }
}









module.exports = {
    generateReport,
    soldProducts,
    refundedProduct,
    getTotalInventory,
    getInventoryByProduct,
    getInventoryByWeek,
    getInventoryByDay,
    getInventoryByMonth,
    addNewProductToInventory
}