const { pool } = require("../config/db");

const ShippingModel = {
    // Function to retrieve shipping information for all orders
    findAllShippingInfo: async () => {
        try {
            const [shippingInfo] = await pool.query(`
        SELECT s.shippingID, s.orderID, s.trackingNum, p.customerEmail, s.cost, s.estimatedDel, 
        c.streetAddress, c.city, c.state, c.zipcode
        FROM shipping s
        LEFT JOIN purchaseOrder p ON s.orderID = p.orderID
        LEFT JOIN customer c on p.customerEmail = c.customerEmail`);
            return shippingInfo;
        } catch (error) {
            throw error;
        }
    },

    // Function to find shipping information by shipping ID
    findShippingInfoById: async (shippingId) => {
        try {
            const [shippingInfo] = await pool.query(`
        SELECT * FROM shipping WHERE shippingID = ?
      `, [shippingId]);
            return shippingInfo[0]; // Assuming shippingId is unique, return the first (and only) result
        } catch (error) {
            throw error;
        }
    },

    findAllShippingInfoByEmail: async (email) => {
        try {
            // Query to retrieve shipping information based on the customer's email
            const [shippingInfo] = await pool.query(`
                SELECT s.shippingID, s.membershipID, s.orderID, s.paymentID, s.cost,
                s.trackingNum, s.carrier, s.shippingDate, s.estimatedDel, s.actualDel,
                s.shippingStatus
                FROM shipping s
                LEFT JOIN purchaseOrder po ON s.orderID = po.orderID
                WHERE po.customerEmail = ?
            `, [email]);

            // Iterate over each shipping record to fetch additional details
            for (let shipping of shippingInfo) {
                // Query to retrieve shipping details for each shipping record
                const [details] = await pool.query(`
                    SELECT sd.productID, sd.quantity, sd.unitPrice, sd.totalAmount, p.productName
                    FROM shippingDetail sd
                    JOIN product p ON sd.productID = p.productID
                    WHERE sd.shippingID = ?
                `, [shipping.shippingID]);

                // Add the shipping details to the shipping record
                shipping.items = details;
            }

            return shippingInfo;
        } catch (error) {
            console.error(error.message);
            throw error;
        }
    },


    // Function to create shipping information for an order
    createShippingInfo: async (shippingData) => {
        try {
            const {
                membershipID,
                orderID,
                paymentID,
                cost,
                trackingNum,
                carrier,
                shippingDate,
                estimatedDel,
                actualDel,
                shippingStatus
            } = shippingData;

            const [result] = await pool.query(`
        INSERT INTO shipping (
          membershipID,
          orderID,
          paymentID,
          cost,
          trackingNum,
          carrier,
          shippingDate,
          estimatedDel,
          actualDel,
          shippingStatus
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `, [
                membershipID,
                orderID,
                paymentID,
                cost,
                trackingNum,
                carrier,
                shippingDate,
                estimatedDel,
                actualDel,
                shippingStatus
            ]);

            return result.insertId; // Return the ID of the newly created shipping info
        } catch (error) {
            throw error;
        }
    },

    // Function to update shipping information for an existing order
    updateShippingInfo: async (shippingId, newData) => {
        try {
            const {
                membershipID,
                orderID,
                paymentID,
                cost,
                trackingNum,
                carrier,
                shippingDate,
                estimatedDel,
                actualDel,
                shippingStatus
            } = newData;

            await pool.query(`
        UPDATE shipping SET 
          membershipID = ?,
          orderID = ?,
          paymentID = ?,
          cost = ?,
          trackingNum = ?,
          carrier = ?,
          shippingDate = ?,
          estimatedDel = ?,
          actualDel = ?,
          shippingStatus = ?
        WHERE shippingID = ?
      `, [
                membershipID,
                orderID,
                paymentID,
                cost,
                trackingNum,
                carrier,
                shippingDate,
                estimatedDel,
                actualDel,
                shippingStatus,
                shippingId
            ]);

            return true; // Return true if the update is successful
        } catch (error) {
            throw error;
        }
    },

    // Function to delete shipping information for an order
    deleteShippingInfo: async (shippingId) => {
        try {
            await pool.query(`
        DELETE FROM shipping WHERE shippingID = ?
      `, [shippingId]);
            return true; // Return true if the deletion is successful
        } catch (error) {
            throw error;
        }
    }
};

module.exports = ShippingModel;
