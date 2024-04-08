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

async function addtoOrder(customerEmail,orderDate,items){
    const connection = await pool.getConnection();
    try{
        await connection.beginTransaction();

        if (items.length==0){
            return null;
        }

        const [getOrderID] = await connection.query(`
        SELECT*
        FROM purchaseOrder
        WHERE customerEmail=? AND orderProcessed=?`,[customerEmail,false]);
        
        let orderLineDetail =[];

        //check if customer has an opened order then update, otherwise insert new order
        if (getOrderID.length==0){
            let tax = 0;
            let total = 0;
            for (let item of items){
                let calTax= item.productPrice*item.productQuantity*0.0825;
                tax += calTax;
                total += item.productPrice*item.productQuantity + calTax;
            }
            const orderRes = await connection.query(`
                INSERT INTO purchaseOrder(customerEmail,orderDate,tax,total)
                VALUEs(?,?,?,?)`,[customerEmail,orderDate,tax,total]);
            
                const [rows] = await connection.query("SELECT LAST_INSERT_ID() as lastId");
                const lastId = rows[0].lastId;

            for (let item of items){
                let tax1 = item.productPrice*item.productQuantity*0.0825;
                let subTotal = item.productPrice*item.productQuantity;
                const orderLineRes = await connection.query(`
                INSERT INTO orderLine(orderID,productID,quantity,unitPrice,tax,subTotal)
                VALUES(?,?,?,?,?,?)`,[lastId,item.productID,item.productQuantity,item.productPrice,tax1,subTotal]);

                //getting the order line information to send it back
                const [anotherRows] = await connection.query("SELECT LAST_INSERT_ID() as lastId");
                const anotherID = anotherRows[0].lastId;

                const res = await connection.query(`
                SELECT*
                FROM orderLine
                WHERE orderLineID=?`,[anotherID]);
                orderLineDetail.push(res);
            }
            
            await connection.commit();
            return {order: orderRes, detail: orderLineDetail};
        } else{ //Update opened order if existed
            let tax = 0;
            let total = 0;
            for (let item of items){
                let calTax= item.productPrice*item.productQuantity*0.0825;
                tax += calTax;
                total += item.productPrice*item.productQuantity + calTax;
            }
            const updateOrder = await connection.query(`
            UPDATE purchaseOrder
            SET tax=tax+?, total=total+?
            WHERE customerEmail=? AND orderProcessed=? AND orderID=?`,[tax,total,customerEmail,false,getOrderID[0].orderID]);

            for (let item of items){
                let tax1 = item.productPrice*item.productQuantity*0.0825;
                let subTotal = item.productPrice*item.productQuantity;
                const updateLineRes = await connection.query(`
                INSERT INTO orderLine(orderID,productID,quantity,unitPrice,tax,subTotal)
                VALUES(?,?,?,?,?,?)`,[getOrderID[0].orderID,item.productID,item.productQuantity,item.productPrice,tax1,subTotal]);

                const [moreID] = await connection.query("SELECT LAST_INSERT_ID() as lastId");
                const onemore = moreID[0].lastId;

                const [res] = await connection.query(`
                SELECT*
                FROM orderLine
                WHERE orderLineID=?`,[onemore]);
                orderLineDetail.push(res);
            }

            await connection.commit();
            return {order: updateOrder, detail: orderLineDetail};
        }
    } catch(error){
        await connection.rollback();
        console.log(error.message);
    } finally {
        await connection.release();
    }
}


//remove single item
async function deleteFromOrder(customerEmail,productID,productPrice,productQuantity,orderLineID){
    const connection = await pool.getConnection();
    try{
        await connection.beginTransaction();
        let reducedTax = productPrice*productQuantity*0.0825;
        let reducedTotal = productPrice*productQuantity+reducedTax;

        const [customerOrder] = await connection.query(`
        SELECT orderID
        FROM purchaseOrder
        WHERE customerEmail=? AND orderProcessed=?`,[customerEmail,false]);

        if (customerOrder.length>0){
            const userOrderID = customerOrder[0].orderID;
            const updateOrder = await connection.query(`
            UPDATE purchaseOrder
            SET tax=tax-?, total=total-?
            WHERE orderID=? AND customerEmail=? AND orderProcessed=?`,[reducedTax,reducedTotal,userOrderID,customerEmail,false]);

            const updateOrderLine = await connection.query(`
            DELETE FROM orderLine
            WHERE orderLineID=? AND orderID=? AND productID=?`,[orderLineID,userOrderID,productID]);

            await connection.commit();
            return {order: updateOrder, orderLine: updateOrderLine};
        } else  {
            console.log('No opened oder found to remove item')
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

async function findProcessedOrderbyEmail(email){
    try{
        const res = await pool.query(`
        SELECT *
        FROM purchaseOrder
        WHERE customerEmail=? AND orderProcessed=?`,[email,true]);
        
        return res;
    } catch(error){
        console.log(error.message);
        throw error;
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
        SELECT p.orderID, p.orderDate, p.tax, p.total
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
        SELECT p.orderID, p.orderDate, o.productID, o.quantity, o.unitPrice, o.tax, o.subTotal
        FROM purchaseOrder p
        JOIN orderLine o
        ON p.orderID = o.orderID
        WHERE p.orderID=?`,[orderID]);

        return res;
    } catch(error){
        console.log(error.message);
        throw error;
    }
}

module.exports={
    findAllOrder,
    addtoOrder,
    deleteFromOrder,
    findProcessedOrderbyEmail,
    findAllOrderbyEmail,
    findOrderByLname,
    findOrderDetail
}

// add orderProcessed attribute into purchaseOrder table default false
