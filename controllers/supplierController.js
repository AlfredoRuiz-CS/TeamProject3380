const supplierModel = require('../models/supplierModel');
const { getRequestBody } = require('../lib/requestBodyParser');

const getAllSuppliers = async (req, res) => {
    try {
        const suppliers = await supplierModel.getAllSuppliers();

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(suppliers));

    } catch(error) {
        res.writeHead(400, { 'Content-Type' : 'application/json' })
        res.end(JSON.stringify({ error: error.message}))
    }
};

const insertSupplier = async (req, res) => {
    try {
        const body = await getRequestBody(req);
        const { name, phoneNumber, streetAddress, city, state, zipcode } = body;

        const supplier = await supplierModel.insertSupplier(name, phoneNumber, streetAddress, city, state, zipcode);
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ "message": "Successfully added supplier to database" }));

    } catch (error) {
        res.writeHead(400, { 'Content-Type' : 'application/json' });
        res.end(JSON.stringify({ error: error.message}));
    }
}

module.exports = {
    getAllSuppliers,
    insertSupplier
}