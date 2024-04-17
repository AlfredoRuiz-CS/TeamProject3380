const { pool } = require("../config/db");

async function createMembership(customerEmail,startDate,endDate,renewalDate,paymentMethod){
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();
        const [res] = await connection.query(`
        INSERT INTO purchaseOrder(customerEmail,orderDate,total)
        VALUES(?,?,?)`,[customerEmail,startDate,10]);
        //get orderID
        const [rows] = await connection.query("SELECT LAST_INSERT_ID() as lastId");
        const lastId = rows[0].lastId;
        //create payment
        const [createPayment] = await connection.query(`
        INSERT INTO payment(orderID,paymentDate,totalAmount,paymentMethod,paymentStatus)
        VALUES(?,?,?,?,?)`,[lastId,startDate,10,paymentMethod,"pass"])
        const [createMember] = await connection.query(`
        INSERT INTO membership(customerEmail,membershipStatus,startDate,endDate,renewalDate)
        VALUES(?,?,?,?,?)`,[customerEmail,1,startDate,endDate,renewalDate])

        const result = {
            isMember: true
        }

        await connection.commit();
        return result;
    } catch (error){
        await connection.rollback();
        console.log(error);
        throw error
    } finally{
        await connection.release();
    }
}

async function getMembershipStatus(customerEmail) {
    try {
        const [rows] = await pool.query(`
        SELECT *
        FROM membership
        where customerEmail = ?`, [customerEmail])
        if (!rows) throw error("Couldn't find membership")

        let membershipStatus = "None"
            
        if (rows.length > 0) {
            const membership = rows[0];

            const startDate = new Date(membership.startDate);
            const endDate = new Date(membership.endDate);

            const timeDiff = Math.abs(endDate.getTime() - startDate.getTime());
            const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

            if (diffDays === 365 || diffDays === 366) {
                membershipStatus = "From Order";
            } else {
                membershipStatus = "Purchased";
            }
        }
        
        return membershipStatus;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports={
    createMembership,
    getMembershipStatus
}