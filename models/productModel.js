const { pool } = require('../config/db');

async function getAllProducts() {
    try {
        const [rows] = await pool.query(`
        SELECT p.*,
        n.servingSize, n.servingsPerContainer, n.calories, n.totalFat, n.cholesterol, n.sodium, n.dietaryFiber, 
        n.sugars, n.protein, n.potassium, n.vitaminA, n.vitaminC, n.vitaminD, n.vitaminE, n.calcium, n.iron,
        s.dimensionsLength, s.dimensionsWidth, s.dimensionsHeight, s.weight
        FROM product p
        LEFT JOIN nutritionFacts n on p.productID = n.productID
        LEFT JOIN shippingDetails s on p.productID = s.productID`);

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
            nutritionFacts.totalCarbohydrates,
            nutritionFacts.dietaryFiber,
            nutritionFacts.sugars,
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