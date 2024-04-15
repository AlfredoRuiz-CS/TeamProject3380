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

module.exports={
    createMembership
}