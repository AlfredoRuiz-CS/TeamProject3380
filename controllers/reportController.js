const reportModel = require('../models/reportModel')
const { getRequestBody } = require('../lib/requestBodyParser');

const getReport = async (req, res) => {
  try {
    const body = await getRequestBody(req);
    const { startDate, endDate } = body;
    const result = await reportModel.generateReport(startDate, endDate);
    if (!result) {
      res.writeHead(500, { 'Content-Type': "application/json" });
      res.end(JSON.stringify({ "message": `Failed to get report` }));
      return;
    }
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      "message": `Here is the report`,
      "data": result
    }));
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ "error": error.message }));
  }
}

const getSoldProducts = async (req, res) => {
  try {
    const body = await getRequestBody(req);
    const { startDate, endDate } = body;
    const result = await reportModel.soldProducts(startDate, endDate);
    if (!result) {
      res.writeHead(500, { 'Content-Type': "application/json" });
      res.end(JSON.stringify({ "message": `Failed to get sold product report` }));
      return;
    }
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      "message": `Here is the sold product report`,
      "result": result
    }));
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ "error": error.message }));
  }
}

const getRefundedProducts = async (req, res) => {
  try {
    const body = await getRequestBody(req);
    const { startDate, endDate } = body;
    const result = await reportModel.refundedProduct(startDate, endDate);
    if (!result) {
      res.writeHead(500, { 'Content-Type': "application/json" });
      res.end(JSON.stringify({ "message": `Failed to get sold product report` }));
      return;
    }
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      "message": `Here is the refunded product report`,
      "result": result
    }));
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ "error": error.message }));
  }
}


const addProductToInventory = async (req, res) => {
  try {
    const body = await getRequestBody(req);
    const result = await inventoryModel.addNewProductToInventory(body);
    if (!result.success) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ "message": result.message }));
      return;
    }
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ "message": "Product added to inventory successfully" }));
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ "error": error.message }));
  }
}

const getTotalInventory = async (req, res) => {
  try {
    const totalInventory = await inventoryModel.getTotalInventory();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ "totalInventory": totalInventory }));
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ "error": error.message }));
  }
}


const getInventoryByWeek = async (req, res) => {
  try {
    const body = await getRequestBody(req);
    const { startDate, endDate, productId } = body;
    const inventoryByWeek = await inventoryModel.getInventoryByWeek(startDate, endDate, productId);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ "inventoryByWeek": inventoryByWeek }));
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ "error": error.message }));
  }
}

const getInventoryByDay = async (req, res) => {
  try {
    const body = await getRequestBody(req);
    const { date, productId } = body;
    const inventoryByDay = await inventoryModel.getInventoryByDay(date, productId);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ "inventoryByDay": inventoryByDay }));
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ "error": error.message }));
  }
}

const getInventoryByMonth = async (req, res) => {
  try {
    const body = await getRequestBody(req);
    const { month, year, productId } = body;
    const inventoryByMonth = await inventoryModel.getInventoryByMonth(month, year, productId);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ "inventoryByMonth": inventoryByMonth }));
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ "error": error.message }));
  }
}


module.exports = {
  getReport,
  getSoldProducts,
  getRefundedProducts,
  getTotalInventory,
  getInventoryByMonth,
  getInventoryByDay,
  getInventoryByWeek,
  addProductToInventory
}


