const { pool } = require('../config/db');

async function getAllProducts() {
    try {
        // const [rows] = await pool.query(`
        // SELECT p.*,
        // n.servingSize, n.servingsPerContainer, n.calories, n.totalFat, n.cholesterol, n.sodium, n.totalCarbohydrates, n.dietaryFiber, 
        // n.sugars, n.protein, n.potassium, n.vitaminA, n.vitaminC, n.vitaminD, n.vitaminE, n.calcium, n.iron,
        // s.dimensionsLength, s.dimensionsWidth, s.dimensionsHeight, s.weight
        // FROM product p
        // LEFT JOIN nutritionFacts n on p.productID = n.productID
        // LEFT JOIN shippingDetails s on p.productID = s.productID`);

        const [rows] = await pool.query(`
        SELECT
        p.productID, p.productName, p.productDesc, p.productPrice, p.stockQuantity, c.categName, p.image, p.supplier, p.supplierStock, p.portion, p.supplierPrice,
        n.servingSize, n.servingsPerContainer, n.calories, n.totalFat, n.cholesterol, n.sodium, n.totalCarbohydrates, n.dietaryFiber, 
        n.sugars, n.protein, n.potassium, n.vitaminA, n.vitaminC, n.vitaminD, n.vitaminE, n.calcium, n.iron,
        s.dimensionsLength, s.dimensionsWidth, s.dimensionsHeight, s.weight
        FROM product p
        LEFT JOIN nutritionFacts n on p.productID = n.productID
        LEFT JOIN shippingDetails s on p.productID = s.productID
        JOIN category c on c.categoryID = p.categoryID
        WHERE p.active=?`,[1]);

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
        INSERT INTO nutritionFacts (productID, servingSize, servingsPerContainer, calories, totalFat, cholesterol, sodium, totalCarbohydrates, dietaryFiber, sugars, protein, potassium, vitaminA, vitaminC, vitaminD, vitaminE, calcium, iron)
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

async function insertInventory(connection,productID,productInfo,stockDate){
    try{
        const [row] = await connection.execute(`
        SELECT supplierID
        FROM supplier s
        WHERE s.name=?`,[productInfo.supplier]);

        if (row.length === 0) {
            // No supplier found, handle the error appropriately
            throw new Error(`No supplier found with name: ${productInfo.supplier}`);
        }

       const [result] = await connection.execute(`
       INSERT INTO inventory (productID,supplierID,quantity,purchasePrice)
       VALUES(?,?,?,?)`,[productID,row[0].supplierID,productInfo.stockQuantity,productInfo.productPrice*0.5]);

       const [payout] = await connection.execute(`
       INSERT INTO payout(productID,quantity,purchasePrice,payoutDate,totalPayout)
       VALUES(?,?,?,?,?)`,[productID,productInfo.stockQuantity,productInfo.productPrice*0.5,stockDate,productInfo.productPrice*0.5*productInfo.stockQuantity]);

        return result;
    } catch (error){
        console.log(error);
        throw error;
    }
}

async function removeProduct(name){
    try{
        const result = await pool.query(`
        UPDATE product
        SET active=?
        WHERE productName=? AND active=?`,[0,name,1]);

        if (result[0].affectedRows === 0) {
            return null;
        }

        return result;
    } catch(error){
        console.log(error);
        throw error;
    }
}

async function removeStock(name, quantity){
    try {
        const result = await pool.query(`
        UPDATE product
        set quantity=?
        where productName=?`, [quantity,name]);

        return result;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports = {
    getAllProducts,
    insertProduct,
    insertNutritionFacts,
    insertShippingDetails,
    insertInventory,
    removeProduct,
    removeStock
}