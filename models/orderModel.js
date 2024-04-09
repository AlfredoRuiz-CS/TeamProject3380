const { ErrorMessage } = require("formik");
const {pool} = require("../config/db");

//getAllOrder used by employee
async function findAllOrder(){
    try{
        const res = await pool.query(`
        SELECT *
        FROM purchaseOrder`,);
        return res;
    } catch(error){
        console.log(error.message);
        throw error;
    }
};

async function createOrder(customerEmail,orderDate,items,paymentMethod){
    const connection = await pool.getConnection();
    try{
        await connection.beginTransaction();

        if (items.length==0){
            return null;
        }
        
        let orderLineDetail =[];
        let total = 0;
        //calculate the total for the purchaseOrder
        for (let item of items){
            total += item.productPrice*item.productQuantity;
        }
        //create new order
        const orderRes = await connection.query(`
            INSERT INTO purchaseOrder(customerEmail,orderDate,total)
            VALUEs(?,?,?)`,[customerEmail,orderDate,total]);
        //get the last insert id which is the newest orderID
        const [rows] = await connection.query("SELECT LAST_INSERT_ID() as lastId");
        const lastId = rows[0].lastId;
        //create payment
        const createPayment = await connection.query(`
        INSERT INTO payment(orderID,paymentDate,totalAmount,paymentMethod,paymentStatus)
        VALUE(?,?,?,?,?)`,[lastId,orderDate,total,paymentMethod,"pass"])
        //create detail order in orderLine
        for (let item of items){
            let subTotal = item.productPrice*item.productQuantity;
            const orderLineRes = await connection.query(`
            INSERT INTO orderLine(orderID,productID,quantity,unitPrice,subTotal)
            VALUES(?,?,?,?,?)`,[lastId,item.productID,item.productQuantity,item.productPrice,subTotal]);
            //getting the order line information to send it back
            const [anotherRows] = await connection.query("SELECT LAST_INSERT_ID() as lastId");
            const anotherID = anotherRows[0].lastId;
            const res = await connection.query(`
            SELECT*
            FROM orderLine
            WHERE orderLineID=? AND active=?`,[anotherID,1]);
            orderLineDetail.push(res[0]);
        }
        await connection.commit();
        return {order: orderRes, detail: orderLineDetail};
    } catch(error){
        await connection.rollback();
        console.log(error.message);
    } finally {
        await connection.release();
    }
}

async function findAllOrderbyEmail(email){
    try{
        const res = await pool.query(`
        SELECT *
        FROM purchaseOrder
        WHERE customerEmail=?`,[email])

        return res;
    } catch(error){
        console.log(error.message);
        throw error;
    }
}

async function findOrderByLname(lname){
    try{
        const res = await pool.query(`
        SELECT p.orderID, p.orderDate, p.total
        FROM customer c 
        JOIN purchaseOrder p
        ON c.email = p.customerEmail
        WHERE lname=?`,[lname]);

        return res;
    } catch(error){
        console.log(error.message);
        throw error;
    }
}

async function findOrderDetail(orderID){
    try{
        const res = await pool.query(`
        SELECT p.orderID, p.orderDate, o.productID, o.quantity, o.unitPrice, o.subTotal
        FROM purchaseOrder p
        JOIN orderLine o
        ON p.orderID = o.orderID
        WHERE p.orderID=? AND o.active=?`,[orderID,1]);

        return res[0];
    } catch(error){
        console.log(error.message);
        throw error;
    }
}

async function refundItems(paymentID,items,refundDate,orderLineID){
    const connection = await pool.getConnection()
    try{
        await connection.beginTransaction();
        if(items.length==0){
            return null;
        }
        let amount = 0;
        let removedItems = [];

        //calculate total amount of refund for record, add refunded items' names into a list, and update orderLine
        for(let item of items){
            amount += item.productPrice*item.productQuantity;
            const [res] = await connection.query(`
            SELECT productName
            FROM product p
            JOIN orderLine o
            ON o.productID = p.productID
            WHERE o.orderLineID IN(?) AND o.productID=?`,[orderLineID,item.productID]);

            //store refunded items
            removedItems.push(res.productName);

            //update order line by hiding refunded items: active = 0
            const updateLine = await connection.query(`
            UPDATE orderLine
            SET active=0
            WHERE orderLineID IN(?)`,[orderLineID]);
        }
       
        //This function can be deleted if we can hard-coding paymentMethod
        const pMethod = (await connection).query(`
        SELECT paymentMethod
        FROM payment
        WHERE paymentID=?`,[paymentID]);

        //record the refund
        const createRefund = await connection.query(`
        INSERT INTO refund(paymentID,refundDate,amount,refundMethod,refundStatus)
        VALUES(?,?,?,?,?)`,[paymentID,refundDate,amount,pMethod[0],"pass"]);

        await connection.commit();
        return {refund: createRefund, refundedItems: removedItems};
    } catch(error){
        await connection.rollback();
        console.log(error.message);
    } finally {
        await connection.release();
}
}
module.exports={
    findAllOrder,
    createOrder,
    findAllOrderbyEmail,
    findOrderByLname,
    findOrderDetail,
    refundItems
}

// add orderProcessed attribute into purchaseOrder table default false
