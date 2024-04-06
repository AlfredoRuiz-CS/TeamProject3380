const {pool} = require("../config/db");

//createOrder should include shipping address and items???
async function createOrder(customerEmail, orderDate, items){
    const connection = await pool.getConnection();
    try{
        await connection.beginTransaction();

        //total tax and amount
        let totalTax = 0;
        let totalAmount = 0;

        items.forEach(item => {
            const tax = item.quantity * item.unitPrice * 0.0825;
            totalTax += tax;
            totalAmount += (item.quantity * item.unitPrice) + tax;
        });

        const result = await connection.query(`
        INSERT INTO purchaseOrder(customerEmail, orderDate, tax, totalAmount)
        VALUES(?,?,?,?)`,[customerEmail,orderDate,totalTax,totalAmount]);
        const orderID = LAST_INSERT_ID();
        
        for(const item of items){
            const tax = item.quantity * item.unitPrice * 0.0825;
            const amount = item.quantity * item.unitPrice + tax;
            await connection.query(`
            INSERT INTO orderLine(orderID,productID,quantity,unitPrice,tax,totalAmount)
            VALUE(?,?,?,?,?,?)`,[orderID,item.productID,item.quantity,item.unitPrice,tax,amount]);
        }

        //fetching shipping address from customer profile
        const [[shippingAresult]] = await connection.query(`
        SELECT streetAddress, city, state, zipcode
        FROM customer
        WHERE email=?`,[customerEmail])

        await connection.commit();
        return {orderID,customerEmail,orderDate,totalTax,totalAmount,items,shippingAresult}
    } catch(error){
        await connection.rollback();
        throw error;
    } finally{
        connection.release();
    }
};

async function findAnOrder(orderID){ //searching a specific order with orderID
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
};

async function insertToCart(customerEmail,orderDate,productID,productPrice,productQuantity){
    const connection = await pool.getConnection();
    try{
        await connection.beginTransaction();
        
        let accum_tax = 0;
        let accum_amount = 0;
        accum_tax = productPrice*productQuantity*0.0825;
        accum_amount = productPrice*productQuantity;
        const [rows] = await connection.query(`
        SELECT COUNT(*) AS orderCount
        FROM purchaseOrder
        WHERE customerEmail=? AND orderProcessed=?`,[customerEmail,false])//add orderProcessed into purchaseOrder
        const checkOrder = rows[0].orderCount
        //If order exist then update order
        if (checkOrder>0){
            const res = await connection.query(`
            UPDATE purchaseOrder
            SET tax=tax+?, subTotal=subTotal+?, orderDate=?
            WHERE customerEmail=? AND orderProcessed=?`,
            [accum_tax,accum_amount,orderDate,customerEmail,false])
        } else { // insert new order 
            const res = await connection.query(`
            INSERT INTO purchaseOrder(customerEmail,orderDate,tax,subTotal,orderProcessed)
            VALUES(?,?,?,?,?)`,[customerEmail,orderDate,accum_tax,accum_amount,false])
        }
        //insert item into cart
        const [orderRows] = await connection.query(`
        SELECT orderID
        FROM purchaseOrder
        WHERE customerEmail=? AND orderProcessed=?`,
        [customerEmail,false])
        if (orderRows.length>0){
            const getOrderID = orderRows[0];
            const [cart] = await connection.query(`
            INSERT INTO cart(orderID,productID,productPrice,quantity)
            VALUES(?,?,?,?)`,[getOrderID,productID,productPrice,productQuantity])

            await connection.commit();
            return cart;
        } else  {
            console.log('No order found to add item to cart')
            return null;
        }
    } catch(error){
        await connection.rollback();
        console.log(error.message);
    } finally {
        await connection.release();
    }
}

async function deleteFromCart(customerEmail,productID,productPrice,productQuantity){
    const connection = await pool.getConnection();
    try{
        await connection.beginTransaction();
        let reducedTax = productPrice*productQuantity*0.0825;
        let reducedTotal = productPrice*productQuantity;

        const [customerOrder] = await connection.query(`
        SELECT orderID
        FROM purchaseOrder
        WHERE customerEmail=? AND orderProcessed=?`,[customerEmail,false]);

        if (customerOrder.length>0){
            const userOrderID = customerOrder[0].orderID;
            await connection.query(`
            UPDATE purchaseOrder
            SET tax=tax-?, subTotal=subTotal-?
            WHERE orderID=? AND customerEmail=?`,[reducedTax,reducedTotal,userOrderID,customerEmail]);

            const [removedItem]=await connection.query(`
            DELETE FROM cart c
            WHERE c.orderID=? AND c.productID=?`,
            [userOrderID,productID]);

            await connection.commit();
            return removedItem;
        } else  {
            console.log('No cart or oder found to remove item')
            return null;
        }
    } catch(error){
        await connection.rollback();
        console.log(error.message);
        throw error;
    } finally {
        await connection.release();
    }
}

async function queryCurrentCart(customerEmail){
    const connection = await pool.getConnection();
    try{
        const res = await connection.query(`
    SELECT p.name, p.price, p.description, c.quantity
    FROM product p JOIN cart c ON p.productID = c.productID
    JOIN purchaseOrder pO ON c.orderID = p0.orderID
    WHERE p0.orderProcessed=false AND p0.customerEmail='${customerEmail}`);
    
    await connection.commit();
    return res.rows;
    } catch(error){
        await connection.rollback();
        console.log(error.message);
        throw error;
    } finally {
        await connection.release();
    }
}

async function queryUnprocessedOrder(customerEmail){
    try{
        const res = await pool.query(`
        SELECT *
        FROM purchaseOrder p0
        WHERE p0.customerEmail='${customerEmail}' AND p0.orderProcessed=false`);

        return res.rows
    } catch(error){
        console.log(error.message)
        throw error;
    }
}

async function updateBankBanlance (customerEmail,orderDate){
    const connection = await pool.getConnection();
    try{
        await connection.beginTransaction();

        const [orderInfo] = await pool.query(`
        SELECT subTotal,tax,orderID
        FROM purchaseOrder
        WHERE customerEmail=? AND orderProcessed=?`,[customerEmail,false]);
        const {subTotal,tax,getOrderID} = orderInfo.rows[0];
        let total = subTotal + tax;

        //update bank's balance of customers
        const res = await connection.query(`
        UPDATE bank 
        SET balance = balance -?
        WHERE accountID IN(
            SELECT b.accountID
            FROM customer c
            JOIN bank b ON c.bankID = b.accountID
            JOIN purchaseOrder p0 ON p0.customerEmail = c.email
            WHERE p0.customerEmail =? AND p0.orderProcessed=false
        );`,[total,customerEmail])
        //Assume shipping is $10 for members without memberships
        const res1 = await connection.query(`
        UPDATE bank 
        SET balance = balance - 10
        WHERE accountID IN(
            SELECT b.accountID
            FROM customer c
            JOIN bank b ON c.bankID = b.accountID
            JOIN purchaseOrder p0 ON p0.customerEmail = c.email
            JOIN membership m ON m.customerEmail = c.email
            WHERE p0.customerEmail =? AND p0.orderProcessed=false AND m.membershipStatus = inactive
        );`,[customerEmail])

        //Update store's balance using employee'w role = owner
        const res2 = await connection.query(`
        UPDATE bank 
        SET balance = balance + ?
        WHERE accountID IN(
            SELECT b.accountID
            FROM employee e
            JOIN bank b ON e.bankID = b.accountID
            WHERE e.role=owner
        )`,[total]);

        //update purchaseOrder processed = true after processing 
        await connection.query(`
        UPDATE purchaseOrder
        SET orderProcessed = true,
            orderDate =?
        WHERE customerEmail=? AND orderProcessed=?`,[orderDate,customerEmail,false])

        //get card type [credit,debit,visa,master]
        const [getPaymentMethod] = await connection.query(`
        SELECT cardtype
        FROM paymentInfo
        WHERE customerEmail=?`,[customerEmail]);
        const paymentMethod = getPaymentMethod[0];

        //record payment into database
        await connection.query(`
        INSERT INTO payment(orderID,paymentDate,totalAmount,paymentMethod)
        VALUES(?,?,?,?)`,[getOrderID,orderDate,total,paymentMethod])

        await connection.commit();
        return {res,res1,res2}
    } catch(error){
        await connection.rollback();
        console.log(error.message);
        throw(error);
    } finally{
        await connection.release();
    }
}

module.exports={
    createOrder,
    findAnOrder,
    getAllOrder,
    insertToCart,
    deleteFromCart,
    queryCurrentCart,
    queryUnprocessedOrder,
    updateBankBanlance
}

// add Cart table into database
// add orderProcessed attribute into purchaseOrder table default false
// add bankID into customer table
// add bank table into database