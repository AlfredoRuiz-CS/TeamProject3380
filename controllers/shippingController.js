const shippingModel = require('../models/shippingModel')
// const { getRequestBody } = require('../lib/requestBodyParser');

const ShippingController = {
    // Controller function to retrieve shipping information for all orders
    getAllShippingInfo: async (_req, res) => {
        try {
            const shippingInfo = await shippingModel.findAllShippingInfo();
            res.status(200).json(shippingInfo);
        } catch (error) {
            res.status(500).json({ error: 'Could not retrieve shipping information', message: error.message });
        }
    },

    // Controller function to retrieve shipping information by shipping ID
    getShippingInfoById: async (req, res) => {
        try {
            const { shippingId } = req.params;
            const shippingInfo = await shippingModel.findShippingInfoById(shippingId);
            if (shippingInfo) {
                res.status(200).json(shippingInfo);
            } else {
                res.status(404).json({ error: 'Shipping information not found' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Could not retrieve shipping information', message: error.message });
        }
    },

    getAllShippingInfoWithEmail: async (req, res) => {
        try {
            const customerEmail = req.email; // Assuming the email is stored in req.email
            const shippingInfo = await shippingModel.findAllShippingInfoByEmail(customerEmail);

            if (!shippingInfo || shippingInfo.length === 0) {
                res.status(200).json({ message: 'No shipping information found for the specified email' });
                return;
            }

            res.status(200).json(shippingInfo);
        } catch (error) {
            res.status(500).json({ error: 'Could not retrieve shipping information', message: error.message });
        }
    },


    // Controller function to create shipping information for an order
    createShippingInfo: async (req, res) => {
        try {
            const shippingData = req.body;
            const newShippingId = await shippingModel.createShippingInfo(shippingData);
            res.status(201).json({ message: 'Shipping information created successfully', shippingId: newShippingId });
        } catch (error) {
            res.status(500).json({ error: 'Could not create shipping information', message: error.message });
        }
    },

    // Controller function to update shipping information for an existing order
    updateShippingInfo: async (req, res) => {
        try {
            const { shippingId } = req.params;
            const newData = req.body;
            const success = await shippingModel.updateShippingInfo(shippingId, newData);
            if (success) {
                res.status(200).json({ message: 'Shipping information updated successfully' });
            } else {
                res.status(404).json({ error: 'Shipping information not found' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Could not update shipping information', message: error.message });
        }
    },

    // Controller function to delete shipping information for an order
    deleteShippingInfo: async (req, res) => {
        try {
            const { shippingId } = req.params;
            const success = await shippingModel.deleteShippingInfo(shippingId);
            if (success) {
                res.status(200).json({ message: 'Shipping information deleted successfully' });
            } else {
                res.status(404).json({ error: 'Shipping information not found' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Could not delete shipping information', message: error.message });
        }
    }
};

module.exports = ShippingController;
