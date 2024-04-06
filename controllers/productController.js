const productModel = require('../models/productModel');
const { getRequestBody } = require('../lib/requestBodyParser');
const { pool } = require('../config/db');

const getAllProducts = async (req, res) => {
    try {
        const products = await productModel.getAllProducts();

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(products));
    } catch (error){
        res.writeHead(400, { 'Content-Type' : 'application/json' });
        res.end(JSON.stringify({ error: error.message}));
    }
}

const insertProductInfo = async (req, res) => {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        const body = await getRequestBody(req);
        console.log(body);
        const { productInfo, nutritionFacts, shippingDetails } = body;
        console.log(productInfo);
        console.log(nutritionFacts);
        console.log(shippingDetails);
        
        const prodID = await productModel.insertProduct(connection, productInfo);
        const nutritionF = await productModel.insertNutritionFacts(connection, prodID, nutritionFacts);
        const shipDetails = await productModel.insertShippingDetails(connection, prodID, shippingDetails);

        await connection.commit();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ "message": "Successfully added product to database" }));
        
    } catch (error){
        await connection.rollback();
        res.writeHead(400, { 'Content-Type' : 'application/json' });
        res.end(JSON.stringify({ error: error.message}));
    } finally {
        connection.release();
    }
}


module.exports = {
    getAllProducts,
    insertProductInfo
}