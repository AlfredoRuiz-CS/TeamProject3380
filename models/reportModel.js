const { pool } = require("../config/db");

// async function generateReport(startDate,endDate){
//     try {
//         const [purchaseRes] = await pool.query(`
//             SELECT SUM(p.total) AS totalPurchases
//             FROM purchaseOrder p
//             WHERE p.orderDate BETWEEN ? AND ?`, [startDate, endDate]);

//         const [refundRes] = await pool.query(`
//             SELECT SUM(r.amount) AS totalRefund
//             FROM refund r
//             WHERE r.refundDate BETWEEN ? AND ?`, [startDate, endDate]);

//         const [payoutRes] = await pool.query(`
//             SELECT SUM(p.totalPayout) AS totalPayout
//             FROM payout p
//             WHERE p.payoutDate BETWEEN ? AND ?`,[startDate,endDate]);

//         const totalPurchases = purchaseRes[0] ? purchaseRes[0].totalPurchases : 0; // Default to 0 if null
//         const totalRefund = refundRes[0] ? refundRes[0].totalRefund : 0; // Default to 0 if null
//         const totalPayout = payoutRes[0] ? payoutRes[0].totalPayout : 0;
//         const total = totalPurchases - totalRefund - totalPayout;
//         // Combine into one object
//         const result = {
//             totalPurchases: totalPurchases || 0, // Default to 0 if undefined
//             totalRefund: totalRefund || 0, // Default to 0 if undefined
//             totalPayout: totalPayout,
//             netAmount: total.toFixed(2)
//         };

//         return result;
//     } catch (error) {
//         console.log(error.message);
//         throw error;
//     }
// }

async function soldProducts(startDate, endDate) {
    try {
        const [result] = await pool.query(`
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

        return result;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function refundedProduct(startDate, endDate) {
    try {
        const [result] = await pool.query(`
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

        return result;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// rexamine if still useful
// async function getInventoryByProduct(productId) {
//     try {
//         const [result] = await pool.query(`
//             SELECT * 
//             FROM inventory
//             WHERE productID = ?
//         `, [productId]);

//         return result;
//     } catch (error) {
//         console.error(error);
//         throw error;
//     }
// }

async function grossSales(startDate,endDate){
    try{
        const [result] = await pool.query(`
        SELECT SUM(p.total) AS totalPurchases
        FROM purchaseOrder p
        WHERE p.orderDate BETWEEN ? AND ?`, [startDate, endDate]);

        return result;
    } catch(error){
        console.log(error);
        throw error;
    }
}

async function netSales(startDate, endDate) {
    try {
        const [purchaseRes] = await pool.query(`
            SELECT SUM(p.total) AS totalPurchases
            FROM purchaseOrder p
            WHERE p.orderDate BETWEEN ? AND ?`, [startDate, endDate]);

        const [refundRes] = await pool.query(`
            SELECT SUM(r.amount) AS totalRefund
            FROM refund r
            WHERE r.refundDate BETWEEN ? AND ?`, [startDate, endDate]);

        const [payoutRes] = await pool.query(`
            SELECT SUM(p.totalPayout) AS totalPayout
            FROM payout p
            WHERE p.payoutDate BETWEEN ? AND ?`, [startDate, endDate]);
        let totalPurchases = purchaseRes[0] ? purchaseRes[0].totalPurchases : 0; // Default to 0 if null
        let totalRefund = refundRes[0] ? refundRes[0].totalRefund : 0; // Default to 0 if null
        let totalPayout = payoutRes[0] ? payoutRes[0].totalPayout : 0;
        let total = totalPurchases - totalRefund - totalPayout;
        // Combine into one object
        let result = {
            totalPurchases : totalPurchases || 0, // Default to 0 if undefined
            totalRefund : totalRefund || 0, // Default to 0 if undefined
            totalPayout : totalPayout,
            netAmount : total.toFixed(2),
        };

        return [result];
    } catch (error) {
        console.log(error.message);
        throw error;
    }
}

async function membershipSales(startDate,endDate){
    try{
        const [result] = await pool.query(`
        SELECT 
            COUNT(DISTINCT m.membershipID) AS totalMember,
            SUM(ol.quantity) AS totalMembershipSale,
            SUM(ol.totalAmount) AS totalAmount
        FROM membership m 
        INNER JOIN purchaseOrder p 
        ON m.customerEmail = p.customerEmail
        INNER JOIN orderLine ol 
        ON ol.orderID = p.orderID
        WHERE ol.productID=? AND p.orderDate BETWEEN ? AND ?`, [999, startDate, endDate]);

        return result;
    } catch (error){
        console.log(error);
        throw error;
    }
}

async function refundReport(startDate, endDate) {
    try {
        const [result] = await pool.query(`
        SELECT
            COUNT(r.refundID) AS NoOfRefund,
            pu.customerEmail, 
            SUM(r.amount) AS totalRefund
        FROM refund r
        INNER JOIN payment p ON r.paymentID = p.paymentID
        INNER JOIN purchaseOrder pu ON pu.orderID = p.orderID
        WHERE pu.orderDate BETWEEN ? AND ?
        GROUP BY pu.customerEmail`, [startDate, endDate]);
        return result;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function averagePurchaseValue(startDate,endDate){
    console.log(startDate, endDate);
    try{
        const [result] = await pool.query(`
        SELECT c.email, c.fName, c.lName, ROUND(AVG(p.total), 2) AS AveragePurchaseValue
        FROM customer c
        LEFT JOIN purchaseOrder p ON c.email=p.customerEmail
        WHERE p.orderDate BETWEEN ? AND ?
        GROUP BY c.email`, [startDate,endDate]);

        return result;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function mostPurchase(startDate, endDate) {
    try {
        const [result] = await pool.query(`
        SELECT  
            c.email, c.fName, c.lName, 
            COUNT(p.orderID) AS NumberOfOrder, 
            ROUND(SUM(p.total),2) AS TotalPurchaseValue
        FROM customer c
        LEFT JOIN purchaseOrder p ON p.customerEmail=c.email
        GROUP BY c.email
        ORDER BY TotalPurchaseValue DESC`);

        return result;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function mostPurchaseDated(startDate, endDate) {
    try {
        const [result] = await pool.query(`
        SELECT  
            c.email, c.fName, c.lName, 
            COUNT(p.orderID) AS NumberOfOrder, 
            ROUND(SUM(p.total),2) AS TotalPurchaseValue
        FROM customer c
        LEFT JOIN purchaseOrder p ON p.customerEmail=c.email
        WHERE p.orderDate BETWEEN ? and ?
        GROUP BY c.email
        ORDER BY TotalPurchaseValue DESC`, [startDate, endDate]);

        return result;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function leastPurchase(startDate, endDate) {
    try {
        const [result] = await pool.query(`
        SELECT  
            c.email, c.fName, c.lName, 
            COUNT(p.orderID) AS NumberOfOrder, 
            ROUND(SUM(p.total),2) AS TotalPurchaseValue
        FROM customer c
        LEFT JOIN purchaseOrder p ON p.customerEmail=c.email
        GROUP BY c.email
        ORDER BY TotalPurchaseValue ASC`);

        return result;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function leastPurchaseDated(startDate, endDate) {
    try {
        const [result] = await pool.query(`
        SELECT  
            c.email, c.fName, c.lName, 
            COUNT(p.orderID) AS NumberOfOrder, 
            ROUND(SUM(p.total),2) AS TotalPurchaseValue
        FROM customer c
        LEFT JOIN purchaseOrder p ON p.customerEmail=c.email
        WHERE p.orderDate BETWEEN ? and ?
        GROUP BY c.email
        ORDER BY TotalPurchaseValue ASC`, [startDate, endDate]);

        return result;
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
// async function getInventoryByProduct(productId) {
//     try {
//         const [result] = await pool.query(`
//             SELECT * 
//             FROM inventory
//             WHERE productID = ?
//         `, [productId]);

//         return result;
//     } catch (error) {
//         console.error(error);
//         throw error;
//     }
// }

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
    // generateReport,
    soldProducts,
    refundedProduct,
    grossSales,
    netSales,
    membershipSales,
    refundReport,
    averagePurchaseValue,
    mostPurchase, mostPurchaseDated,
    leastPurchase, leastPurchaseDated,
    getTotalInventory,
    getInventoryByWeek,
    getInventoryByDay,
    getInventoryByMonth,
    addNewProductToInventory,
}