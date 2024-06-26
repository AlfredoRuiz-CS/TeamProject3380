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

        const currTime = new Date();
        const formatDigit = (x) => x.toString().length === 1 ? '0' + x.toString() : x.toString();
        let stockDate = `${currTime.getFullYear()}-${formatDigit(currTime.getMonth()+1)}-${formatDigit(currTime.getDate())}`;

        const body = await getRequestBody(req);
        console.log(body);
        const { productInfo, nutritionFacts, shippingDetails } = body;
        console.log(productInfo);
        console.log(nutritionFacts);
        console.log(shippingDetails);
        
        const prodID = await productModel.insertProduct(connection, productInfo);
        const nutritionF = await productModel.insertNutritionFacts(connection, prodID, nutritionFacts);
        const shipDetails = await productModel.insertShippingDetails(connection, prodID, shippingDetails);
        //add to inventory
        const inventory = await productModel.insertInventory(connection,prodID,productInfo,stockDate);

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

const deleteProduct = async(req,res)=>{
    try{
        const body = await getRequestBody(req);
        const {productName} = body;
        const result = await productModel.removeProduct(productName);

        if(!result){
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end("No product found with that name or it has been removed from the database");
            return; //exits if empty
        }
          res.writeHead(200, { 'Content-Type' : 'application/json' });
          res.end(JSON.stringify({"message": "Successfully delete product from the database"}));
    } catch (error) {
          res.writeHead(500, {'Content-Type': 'application/json' });
          res.end(JSON.stringify({"status": "Could not delete product", "error" : error.message }));
        }
}

const deleteStock = async(req, res) => {
    try {
        const body = await getRequestBody(req);
        const {productName, quantity} = body;
        const result = await productModel.removeStock(productName, quantity);
        if(!result){
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end("No product found with that name or it has been removed from the database");
            return; //exits if empty
        }

        res.writeHead(200, { 'Content-Type' : 'application/json' });
        res.end(JSON.stringify({"message": "Successfully removed stock from product"}));
    } catch (error) {
        res.writeHead(500, {'Content-Type': 'application/json' });
        res.end(JSON.stringify({"status": "Could not remove stock", "error" : error.message }));
    }
}

module.exports = {
    getAllProducts,
    insertProductInfo,
    deleteProduct,
    deleteStock
}