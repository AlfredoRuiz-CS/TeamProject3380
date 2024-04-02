const { pool } = require('../config/db');

async function getAllProducts() {
    try {
        const [rows] = await pool.query(`
        SELECT *
        FROM product`);

        return rows;

    } catch (error){
        console.log(error);
        throw error;
    }
}

async function insertProduct(connection, productInfo){
    try {
        const [result] = await connection.execute(`
        INSERT INTO product (productName, productDesc, productPrice, stockQuantity, categoryID, image, supplier, supplierStock, portion)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `, [
            productInfo.productName,
            productInfo.productDesc,
            productInfo.productPrice,
            productInfo.stockQuantity,
            productInfo.categoryID,
            productInfo.image,
            productInfo.supplier,
            productInfo.supplierStock,
            productInfo.portion
        ]);

        return result.insertId;

    } catch (error){
        console.log(error);
        throw error;

    } 
}

async function insertNutritionFacts(connection, productID, nutritionFacts){
    try {
        const [result] = await connection.execute(`
        INSERT INTO nutritionFacts (productID, servingSize, servingsPerContainer, calories, totalFat, cholesterol, sodium, totalCarbohydrate, dietaryFiber, sugars, protein, potassium, vitaminA, vitaminC, vitaminD, vitaminE, calcium, iron)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `, [
            productID,
            nutritionFacts.servingSize,
            nutritionFacts.servingsPerContainer,
            nutritionFacts.calories,
            nutritionFacts.totalFat,
            nutritionFacts.cholesterol,
            nutritionFacts.sodium,
            nutritionFacts.totalCarbohydrate,
            nutritionFacts.dietaryFiber,
            nutritionFacts.sugar,
            nutritionFacts.protein,
            nutritionFacts.potassium,
            nutritionFacts.vitaminA,
            nutritionFacts.vitaminC,
            nutritionFacts.vitaminD,
            nutritionFacts.vitaminE,
            nutritionFacts.calcium,
            nutritionFacts.iron
        ]);

        return result;

    } catch (error){
        console.log(error);
        throw error;
    }
}

async function insertShippingDetails(connection, productID, shippingDetails){
    try {
        const [result] = await connection.execute(`
        INSERT INTO shippingDetails (productID, dimensionsLength, dimensionsWidth, dimensionsHeight, weight)
        VALUES (?, ?, ?, ?, ?)
        `, [
            productID,
            shippingDetails.dimensionsLength,
            shippingDetails.dimensionsWidth,
            shippingDetails.dimensionsHeight,
            shippingDetails.weight
        ]);

        return result;

    } catch (error){
        console.log(error);
        throw error;
    }
}

module.exports = {
    getAllProducts,
    insertProduct,
    insertNutritionFacts,
    insertShippingDetails
}