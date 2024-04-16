const { pool } = require("../config/db");
const { v4: uuidv4 } = require('uuid');

//getAllOrder used by employee
async function findAllOrder(){
    try{
        const [orders] = await pool.query(`
        SELECT po.orderID, po.customerEmail, po.orderDate, po.total,
        CONCAT(RIGHT(SUBSTRING_INDEX(p.paymentMethod, ' ', 1), 4), ' ', 
        CASE 
            WHEN p.paymentMethod LIKE '%Debit%' THEN 'Debit'
            WHEN p.paymentMethod LIKE '%Credit%' THEN 'Credit'
            ELSE ''
        END) AS paymentMethod
        FROM purchaseOrder po
        LEFT JOIN payment p ON po.orderID = p.orderID`);

        for (let order of orders) {
            const [details] = await pool.query(`
                SELECT ol.productID, ol.quantity, ol.unitPrice, ol.totalAmount, p.productName
                FROM orderLine ol
                JOIN product p ON ol.productID = p.productID
                WHERE ol.orderID = ? AND ol.active = 1
            `, [order.orderID]);

            order.items = details;
        }

        return orders;
    } catch(error){
        console.log(error.message);
        throw error;
    }
};

async function createOrder(customerEmail,orderDate,items,paymentMethod,normalD,fastD){
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
        // console.log("AT PURCHASE ORDER");
        //create new order
        const orderRes = await connection.query(`
            INSERT INTO purchaseOrder(customerEmail,orderDate,total)
            VALUEs(?,?,?)`,[customerEmail,orderDate,total]);
        //get the last insert id which is the newest orderID
        const [rows] = await connection.query("SELECT LAST_INSERT_ID() as lastId");
        const lastId = rows[0].lastId;
        // console.log("AT PAYMENT");
        
        //create payment
        const createPayment = await connection.query(`
        INSERT INTO payment(orderID,paymentDate,totalAmount,paymentMethod,paymentStatus)
        VALUE(?,?,?,?,?)`,[lastId,orderDate,total,paymentMethod,"pass"])
        //gey paymentID for return
        const [getPayment] = await connection.query("SELECT LAST_INSERT_ID() as lastId");
        const IDpayment = getPayment[0].lastId;

        //create shipping
        const [isMember] = await connection.query(`
        SELECT membershipID
        FROM membership
        WHERE customerEmail=?`,[customerEmail]);
        if (isMember.length==0){
            const createShipping = await connection.query(`
            INSERT INTO shipping(orderID,paymentID,cost,trackingNum,estimatedDel,shippingStatus)
            VALUES(?,?,?,?,?,?)`,[lastId,IDpayment,10,uuidv4(),normalD,"Delivering"])
        } else{
            const createShipping = await connection.query(`
            INSERT INTO shipping(membershipID,orderID,paymentID,cost,trackingNum,estimatedDel,shippingStatus)
            VALUES(?,?,?,?,?,?,?)`,[isMember[0].membershipID,lastId,IDpayment,0,uuidv4(),fastD,"Delivering"])
        }
        const [getID] = await connection.query("SELECT LAST_INSERT_ID() as lastId");
        const trackingID = getID[0].lastId;
        const getTrackNum = await connection.query(`
        SELECT trackingNum
        FROM shipping
        WHERE shippingID=?`,[trackingID]);


        // create detail order in orderLine
        for (let item of items){
            console.log(item);
            let subTotal = item.productPrice*item.productQuantity;
            const orderLineRes = await connection.query(`
            INSERT INTO orderLine(orderID,productID,quantity,unitPrice,totalAmount)
            VALUES(?,?,?,?,?)`,[lastId,item.productID,item.productQuantity,item.productPrice,subTotal]);
            //getting the order line information to send it back
            const [anotherRows] = await connection.query("SELECT LAST_INSERT_ID() as lastId");
            const anotherID = anotherRows[0].lastId;
            const res = await connection.query(`
            SELECT p.productName, o.quantity, o.unitPrice, o.totalAmount
            FROM orderLine o
            JOIN product p on o.productID = p.productID
            WHERE orderLineID = ? AND active = ?`,[anotherID,1]);
            orderLineDetail.push(res[0]);
        }
        await connection.commit();
        return {orderID: lastId, detail: orderLineDetail, paymentID: IDpayment, tracking: getTrackNum[0]};
    } catch(error){
        await connection.rollback();
        console.log(error.message);
    } finally {
        await connection.release();
    }
}

async function findAllOrderbyEmail(email){
    try{
        const [orders] = await pool.query(`
            SELECT po.orderID, po.customerEmail, po.orderDate, po.total,
            CONCAT(RIGHT(SUBSTRING_INDEX(p.paymentMethod, ' ', 1), 4), ' ', 
            CASE 
                WHEN p.paymentMethod LIKE '%Debit%' THEN 'Debit'
                WHEN p.paymentMethod LIKE '%Credit%' THEN 'Credit'
                ELSE '' 
            END) AS paymentMethod
            FROM purchaseOrder po
            LEFT JOIN payment p ON po.orderID = p.orderID
            WHERE po.customerEmail = ?`, [email]);

        // For each order, fetch the order details
        for (let order of orders) {
            const [details] = await pool.query(`
                SELECT ol.productID, ol.quantity, ol.unitPrice, ol.totalAmount, p.productName
                FROM orderLine ol
                JOIN product p ON ol.productID = p.productID
                WHERE ol.orderID = ? AND ol.active = 1
            `, [order.orderID]);

            // Add the details to the order
            order.items = details;
        }

        return orders;
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
        SELECT o.productID, o.quantity, o.unitPrice, o.subTotal, p.total
        FROM purchaseOrder p
        JOIN orderLine o
        ON p.orderID = o.orderID
        WHERE p.orderID=? AND o.active=1`,[orderID]);

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

async function addingStock (productName,quantity){
    const connection = await pool.getConnection();
    try{
        await connection.beginTransaction();
        const [id] = await connection.query(`
        SELECT productID
        FROM product
        WHERE productName=?`,[productName]);

        if(id.length==0){
            throw new Error(`There is no such item in the inventory. Please double check your input`);
        }

        const [res] = await connection.query(`
        UPDATE product
        SET stockQuantity=stockQuantity+?
        WHERE productID=?`,[quantity,id[0].productID]);

        const [res1] = await connection.query(`
        UPDATE inventory
        SET quantity=quantity+?
        WHERE productID=?`,[quantity,id[0].productID]);

        await connection.commit();
        return {product: id, amount: quantity};
    } catch (error){
        await connection.rollback();
        console.log(error);
        throw error;
    } finally{
        await connection.release();
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
    findAllPayment,
    addingStock
}

// add orderProcessed attribute into purchaseOrder table default false
