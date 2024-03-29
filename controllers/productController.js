const productModel = require('../models/productModel');

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


module.exports = {
    getAllProducts
}