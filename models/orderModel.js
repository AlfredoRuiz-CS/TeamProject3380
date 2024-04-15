const { ErrorMessage } = require("formik");
const {pool} = require("../config/db");

//getAllOrder used by employee
async function findAllOrder(){
    try{
        const [res] = await pool.query(`
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
            throw new Error(`No item was found`);
        }
        
        let orderLineDetail =[];
        let total = 0;
        //calculate the total for the purchaseOrder, check if any item has 
        //exceeded quantity
        for (let item of items){
            const [res] = await connection.query(`
            SELECT quantity
            FROM inventory
            WHERE productID=?`,[item.productID]);
            if (item.productQuantity > res[0].quantity){
                throw new Error(`Not enough inventory for item: ${item.productName}`);
            }
            await connection.query(`
            UPDATE product
            SET stockQuantity=stockQuantity-?
            WHERE productID=?`,[item.productQuantity,item.productID]);
            await connection.query(`
            UPDATE inventory
            SET quantity=quantity-?
            WHERE productID=?`,[item.productQuantity,item.productID]);

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
        //gey paymentID for return
        const [getPayment] = await connection.query("SELECT LAST_INSERT_ID() as lastId");
        const IDpayment = getPayment[0].lastId;
        //create detail order in orderLine
        for (let item of items){
            let subTotal = item.productPrice*item.productQuantity;
            const orderLineRes = await connection.query(`
            INSERT INTO orderLine(orderID,productID,quantity,unitPrice,totalAmount)
            VALUES(?,?,?,?,?)`,[lastId,item.productID,item.productQuantity,item.productPrice,subTotal]);
            //getting the order line information to send it back
            const [anotherRows] = await connection.query("SELECT LAST_INSERT_ID() as lastId");
            const anotherID = anotherRows[0].lastId;
            const res = await connection.query(`
            SELECT productName, quantity, unitPrice, subTotal
            FROM orderLine o
            JOIN product p 
            WHERE orderLineID=? AND active=? AND o.productID = p.productID`,[anotherID,1]);
            orderLineDetail.push(res[0]);
        }
        await connection.commit();
        return {orderID: lastId, detail: orderLineDetail, paymentID: IDpayment};
    } catch(error){
        await connection.rollback();
        console.log(error.message);
    } finally {
        await connection.release();
    }
}

async function findAllOrderbyEmail(email){
    try{
        const [res] = await pool.query(`
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
        const [res] = await pool.query(`
        SELECT p.orderID, p.customerEmail, p.orderDate, p.total
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
        const [res] = await pool.query(`
        SELECT o.productID, o.quantity, o.unitPrice, o.subTotal
        FROM purchaseOrder p
        JOIN orderLine o
        ON p.orderID = o.orderID
        WHERE p.orderID=? AND o.active=?`,[orderID,1]);

        return res;
    } catch(error){
        console.log(error.message);
        throw error;
    }
}

async function refundItems(orderID,items,refundDate){
    const connection = await pool.getConnection()
    try{
        await connection.beginTransaction();
        if(items.length==0){
            return null;
        }
        let amount = 0;
        let removedItems = [];

        //calculate total amount of refund for record, add refunded items into a list, and update orderLine
        for(let item of items){
            amount += item.productPrice*item.productQuantity;
            const [res] = await connection.query(`
            SELECT productName, orderLineID
            FROM purchaseOrder p 
            JOIN orderLine o 
            ON p.orderID = o.orderID
            JOIN product
            ON o.productID = product.productID
            WHERE p.orderID=? AND o.productID=?`,[orderID,item.productID]);

            //store refunded items
            if (res.length > 0) {
                removedItems.push(res[0].productName);
              } else {
                console.log("No product found for this orderID and productID:", orderID, item.productID);
              }

            //update order line by hiding refunded items: active = 0
            const [updateLine] = await connection.query(`
            UPDATE orderLine
            SET active=0
            WHERE orderLineID=?`,[res[0].orderLineID]);
        }
       
        const [payment] = await connection.query(`
        SELECT paymentMethod, paymentID
        FROM payment
        WHERE orderID=?`,[orderID]);

        //record the refund
        const [createRefund] = await connection.query(`
        INSERT INTO refund(paymentID,refundDate,amount,refundMethod,refundStatus)
        VALUES(?,?,?,?,?)`,[payment[0].paymentID,refundDate,amount,payment[0].paymentMethod,"pass"]);

        await connection.commit();
        return {refund: createRefund,refundedItems: removedItems};
    } catch(error){
        await connection.rollback();
        console.log(error.message);
    } finally {
        await connection.release();
}
}

async function findRefund (refundID){
    try{
        const [result] = await pool.query(`
        SELECT*
        FROM refund
        WHERE refundID=?`,[refundID]);

        return result;
    } catch(error){
        console.log(error.message);
        throw error;
    }
}


async function findPayment (paymentID){
    try{
        const [result] = await pool.query(`
        SELECT*
        FROM payment
        WHERE paymentID=?`,[paymentID]);

        return result;
    } catch(error){
        console.log(error.message);
        throw error
    }
}
async function findAllRefund (paymentID){
    try{
        const [result] = await pool.query(`
        SELECT*
        FROM refund
        WHERE paymentID=?`,[paymentID]);

        return result;
    } catch(error){
        console.log(error.message);
        throw error
    }
}

async function findAllPayment (orderID){
    try{
        const [result] = await pool.query(`
        SELECT*
        FROM payment
        WHERE orderID=?`,[orderID]);

        return result;
    } catch(error){
        console.log(error.message);
        throw error
    }
}
module.exports={
    findAllOrder,
    createOrder,
    findAllOrderbyEmail,
    findOrderByLname,
    findOrderDetail,
    refundItems,
    findRefund,
    findPayment,
    findAllRefund,
    findAllPayment
}

// add orderProcessed attribute into purchaseOrder table default false
