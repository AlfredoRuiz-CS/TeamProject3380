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
        //create order line
        const [orderLine] = await connection.query(`
        INSERT INTO orderLine(orderID,productID,quantity,unitPrice,totalAmount)
        VALUES(?,?,?,?,?)`,[lastId,999,1,10,10]);
        //create payment
        const [createPayment] = await connection.query(`
        INSERT INTO payment(orderID,paymentDate,totalAmount,paymentMethod,paymentStatus)
        VALUES(?,?,?,?,?)`,[lastId,startDate,10,paymentMethod,"pass"])
        // const [createMember] = await connection.query(`
        // INSERT INTO membership(customerEmail,membershipStatus,startDate,endDate,renewalDate)
        // VALUES(?,?,?,?,?)`,[customerEmail,1,startDate,endDate,renewalDate])
        const [checkMembership] = await connection.query(`
        SELECT endDate
        FROM membership
        WHERE customerEmail=? AND membershipStatus=?`,[customerEmail,1]);
        if (checkMembership.length===0){
            const [createMember] = await connection.query(`
            INSERT INTO membership(customerEmail,membershipStatus,startDate,endDate,renewalDate)
            VALUES(?,?,?,?,?)`,[customerEmail,1,startDate,endDate,renewalDate])
        } else {
            const curEndDate = checkMembership[0].endDate;
            let newEndDate = new Date(curEndDate);
            newEndDate.setMonth(newEndDate.getMonth()+1);
            const formattedED = newEndDate.toISOString().split('T')[0];
            let renewalDate = new Date(newEndDate);
            renewalDate.setDate(newEndDate.getDate() - 1);
            const formattedRD = renewalDate.toISOString().split('T')[0];
            const [updateMembership] = await connection.query(`
            UPDATE membership
            SET endDate=?, renewalDate=?
            WHERE customerEmail=?`,[formattedED,formattedRD,customerEmail]);
        }

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
        WHERE customerEmail = ?`, [customerEmail]);
        if (!rows) throw new Error("Couldn't find membership");

        let membershipStatus = "None";
            
        if (rows.length > 0) {
            const membership = rows[0];

            const startDate = new Date(membership.startDate);
            const endDate = new Date(membership.endDate);

            const monthDiff = endDate.getMonth() - startDate.getMonth() + (12 * (endDate.getFullYear() - startDate.getFullYear()));
            
            if (monthDiff === 3) {
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