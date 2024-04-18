const {pool} = require("../config/db");

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

async function soldProducts(startDate,endDate){
    try{
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
        ORDER BY totalQuantitySold DESC`,[startDate,endDate]);

        // const [res1] = await pool.query(`
        // SELECT categName, p.productName,
        // SUM(ol.quantity) AS totalQuantitySold,
        // `)

        return res;
    } catch (error){
        console.log(error);
        throw error;
    }
}

async function refundedProduct(startDate,endDate){
    try{
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
        ORDER BY totalQuantityReturned DESC`,[startDate,endDate]);

        return res;
    } catch (error){
        console.log(error);
        throw error;
    }
}

async function grossSales(startDate,endDate){
    try{
        const [res] = await pool.query(`
        SELECT SUM(p.total) AS totalPurchases
        FROM purchaseOrder p
        WHERE p.orderDate BETWEEN ? AND ?`,[startDate,endDate]);

        return res;
    } catch(error){
        console.log(error);
        throw error;
    }
}

async function netSales(startDate,endDate){
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
            WHERE p.payoutDate BETWEEN ? AND ?`,[startDate,endDate]);
        const totalPurchases = purchaseRes[0] ? purchaseRes[0].totalPurchases : 0; // Default to 0 if null
        const totalRefund = refundRes[0] ? refundRes[0].totalRefund : 0; // Default to 0 if null
        const totalPayout = payoutRes[0] ? payoutRes[0].totalPayout : 0;
        const total = totalPurchases - totalRefund - totalPayout;
        // Combine into one object
        const result = {
            totalPurchases: totalPurchases || 0, // Default to 0 if undefined
            totalRefund: totalRefund || 0, // Default to 0 if undefined
            totalPayout: totalPayout,
            netAmount: total.toFixed(2)
        };

        return result;
    } catch (error) {
        console.log(error.message);
        throw error;
    }
}

async function membershipSales(startDate,endDate){
    try{
        const [sales] = await pool.query(`
        SELECT 
            COUNT(DISTINCT m.membershipID) AS totalMember,
            SUM(ol.quantity) AS totalMembershipSale,
            SUM(ol.totalAmount) AS totalAmount
        FROM membership m 
        INNER JOIN purchaseOrder p 
        ON m.customerEmail = p.customerEmail
        INNER JOIN orderLine ol 
        ON ol.orderID = p.orderID
        WHERE ol.productID=? AND p.orderDate BETWEEN ? AND ?`,[999,startDate,endDate]);

        return sales;
    } catch (error){
        console.log(error);
        throw error;
    }
}

async function refundReport(startDate,endDate){
    try{
        const [result] = await pool.query(`
        SELECT
            COUNT(r.refundID) AS NoOfRefund,
            pu.customerEmail, 
            SUM(r.amount) AS totalRefund
        FROM refund r
        INNER JOIN payment p ON r.paymentID = p.paymentID
        INNER JOIN purchaseOrder pu ON pu.orderID = p.orderID
        WHERE pu.orderDate BETWEEN ? AND ?
        GROUP BY pu.customerEmail`,[startDate,endDate]);
            return result;
    } catch(error){
        console.log(error);
        throw error;
    }
}



module.exports={
    // generateReport,
    soldProducts,
    refundedProduct,
    grossSales,
    netSales,
    membershipSales,
    refundReport
}