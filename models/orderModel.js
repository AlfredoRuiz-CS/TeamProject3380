const {pool} = require(".../config/db");

//createOrder should include shipping address and items???
async function createOrder(customerEmail, orderDate, items){
    const connection = await pool.getConnection();
    try{
        await connection.beginTransaction();

        //total tax and amount
        let totalTax = 0;
        let totalAmount = 0;
        
        for(const item of items){
            const tax = item.quantity * item.unitPrice * 0.0825;
            totalTax += tax;
            const amount = item.quantity * item.unitPrice + tax;
            totalAmount += amount;
            await connection.query(`
            INSERT INTO orderLine(orderID,productID,quantity,unitPrice,tax,totalAmount)
            VALUE(?,?,?,?,?,?)`,[orderID,item.productID,item.quantity,item.unitPrice,tax,amount]);
        }

        const result = await connection.query(`
        INSERT INTO purchaseOrder(customerEmail, orderDate, tax, totalAmount)
        VALUES(?,NOW(),?,?)`,[customerEmail,totalTax,totalAmount]);
        const orderID = result.insertId;

        //fetching shipping address from customer profile
        const shippingA = await connection.query(`
        SELECT streetAddress, city, state, zipcode
        FROM customer
        WHERE email=?`,[customerEmail])
        const shippingAresult = shippingA[0];

        await connection.commit();
        return {orderID,customerEmail,orderDate,totalTax,totalAmount,items,shippingAresult}
    } catch(error){
        await connection.rollback();
        throw error;
    } finally{
        connection.release();
    }
};

async function getOrderInfo(orderID){ //searching a specific order with orderID
    try{
        const [order] = await pool.query(`
        Select *
        FROM purchaseOrder
        WHERE orderID =?`, [orderID]);
        return order;
     } catch(error) {
        console.log(error.message);
        throw error;
     }
};

async function getAllOrder(customerEmail){
    try{
        const [allOrder] = await pool.query(`
        SELECT *
        FROM purchaseOrder
        WHERE customerEmail=?`,[customerEmail]);
        return allOrder;
    } catch(error){
        console.log(error.message);
        throw error;
    }
}