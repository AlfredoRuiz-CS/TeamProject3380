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
        const orderID = result.insertId;
        
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
};

async function addItem(orderID, items){
    const connection = await pool.getConnection();
    try{
        await connection.beginTransaction();
         //total tax and amount
         let newTax = 0;
         let newAmount = 0;
         
         for(const item of items){
             const tax = item.quantity * item.unitPrice * 0.0825;
             newTax += tax;
             const amount = item.quantity * item.unitPrice + tax;
             newAmount += amount;
             await connection.query(`
             INSERT INTO orderLine(orderID,productID,quantity,unitPrice,tax,totalAmount)
             VALUE(?,?,?,?,?,?)`,[orderID,item.productID,item.quantity,item.unitPrice,tax,amount]);
         }

         //update new tax and new total
         await connection.query(`
         UPDATE purchaseOrder
         SET tax=?+tax,
         totalAmount=?+totalAmount
         WHERE orderID=?`,[newTax,newAmount,orderID])

         await connection.commit();
         return {orderID, itemsAdded: items.length};
    } catch(error){
        console.log(error.message);
        throw error;
    } finally {
        connection.release();
    }
};

//remove item from existing order
async function removeItem(orderID,items){
    const connection = await pool.getConnection();
    try{
        await connection.beginTransaction();
        let removedTax = 0;
        let removedAmount = 0;
        for(const item of items){
            const [existingItem] = await connection.query(`
            SELECT quantity, unitPrice FROM orderLine
            WHERE orderID=?, AND productID=?`,[orderID,item.productID]);
            if(existingItem.length){
                const tax = existingItem[0].quantity*existingItem.unitPrice*0.0825;
                const amount = existingItem[0].quantity*existingItem.unitPrice+tax;
                removedTax+=tax;
                removedAmount+=amount;
                await connection.query(`
                DELETE FROM orderLine
                WHERE orderID=?, AND productID=?`,[orderID,item.productID]);
            }
        }
        //update new tax and new total
        await connection.query(`
        UPDATE purchaseOrder
        SET tax=tax-?,
        totalAmount=totalAmount-?
        WHERE orderID=?`,[removedTax,removedAmount,orderID])
        await connection.commit();
        return {orderID, itemsRemoved: items.length};
    } catch(error){
        console.log(error.message);
        throw error;
    } finally {
        connection.release();
    }
};

module.exports={
    createOrder,
    getOrderInfo,
    getAllOrder,
    addItem,
    removeItem
}