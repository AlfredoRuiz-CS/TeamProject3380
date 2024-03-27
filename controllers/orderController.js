const orderModel = require('../models/orderModel')
const { setCorsHeaders } = require('../lib/cors');

const getRequestBody = (req) => {
    return new Promise((resolve, reject) => {
      let body = '';
      req.on('data', chunk => {
        body += chunk.toString();
      });
      req.on('end', () => {
        try {
          // Parse the body string as JSON
          const parsedBody = JSON.parse(body);
          resolve(parsedBody);
        } catch (error) {
          reject(error);
        }
      });
      req.on('error', (err) => {
        reject(err);
      });
    });
  };

//creating new order
const createOrder = async (req, res) => {
    try{
        const body = await getRequestBody(req);
        const{customerEmail,items} = body;
        const currTime = new Date();
        const formatDigit = (x) => x.toString().length === 1 ? '0' + x.toString() : x.toString();
        let orderDate = `${currTime.getFullYear()}-${formatDigit(currTime.getMonth()+1)}-${formatDigit(currTime.getDate())}`;
        const order = await orderModel.createOrder(customerEmail,orderDate,items);

        res.writeHead(200,{'Content-Type': 'application/json'});
        res.end(JSON.stringify({order}));
    } catch(error){
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: error.message }));
    }
};

//get a specific order with orderID
const getOrderInfo = async (req,res) => {
  try{
    const body = await getRequestBody(req);
    const {orderID} = body;
    const order = await orderModel.getOrderInfo(orderID);
    if (!order){
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end("none");
      return; //exits if order is empty
    }
    //else shows order
    res.writeHead(200, { 'Content-Type' : 'application/json' });
    res.end(JSON.stringify(order));

    } catch (error) {
    res.writeHead(500, {' Content-Type': 'application/json' });
    res.end(JSON.stringify({"status": "Could not retrieve order information", "error" : error.message }));
    }
}

//get all orders with customer email
const getAllOrder = async (req,res) => {
  try{
    const body = await getRequestBody(req);
    const {customerEmail} = body;
    const allOrder = await orderModel.getAllOrder(customerEmail);
    if(!allOrder){
      res.writeHead(200,{'Content-Type': 'application/json'});
      res.end("none");
      return; //exits if there is no order
    }
    //else show all orders
    res.writeHead(200,{'Content-Type':'application/json'});
    res.end(JSON.stringify(allOrder));
  } catch (error) {
    res.writeHead(500, {' Content-Type': 'application/json' });
    res.end(JSON.stringify({"status": "Could not retrieve order information", "error" : error.message }));
    }
}

//add items to existing order
const addItemToOrder = async (req,res) => {
  try{
    const body = await getRequestBody(req);
    const {orderID, items} = body;
    const addedItems = await orderModel.addItem(orderID,items);
    if(!addedItems){
      res.writeHead(200,{'Content-Type': 'application/json'});
      res.end("none");
      return; //exits if there is no added item
    }
    //else show the number of added items
    res.writeHead(200,{'Content-Type':'application/json'});
    res.end(JSON.stringify(addedItems));
  } catch(error){
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: error.message }));
  }
}

//add items to existing order
const removeItemFromOrder = async (req,res) => {
  try{
    const body = await getRequestBody(req);
    const {orderID, items} = body;
    const removedItems = await orderModel.addItem(orderID,items);
    if(!removedItems){
      res.writeHead(200,{'Content-Type': 'application/json'});
      res.end("none");
      return; //exits if there is no removed item
    }
    //else show the number of added items
    res.writeHead(200,{'Content-Type':'application/json'});
    res.end(JSON.stringify(removedItems));
  } catch(error){
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: error.message }));
  }
}

module.exports={
  createOrder,
  getOrderInfo,
  getAllOrder,
  addItemToOrder,
  removeItemFromOrder
}