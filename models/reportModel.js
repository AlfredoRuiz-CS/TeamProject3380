const { ErrorMessage } = require("formik");
const {pool} = require("../config/db");

async function generateReport(startDate,endDate){
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

module.exports={
    generateReport
}