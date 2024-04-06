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
const findOrder = async (req,res) => {
  try{
    const body = await getRequestBody(req);
    const {orderID} = body;
    const order = await orderModel.findAnOrder(orderID);
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

const addToCart = async(req,res)=>{
  try{
    const body = await getRequestBody(req);
    const {customerEmail,productID,productPrice,productName,productQuantity} = body;
    const currTime = new Date();
    const formatDigit = (x) => x.toString().length === 1 ? '0' + x.toString() : x.toString();
    let orderDate = `${currTime.getFullYear()}-${formatDigit(currTime.getMonth()+1)}-${formatDigit(currTime.getDate())}`;
    const toCart = await orderModel.insertToCart(customerEmail,orderDate,productID,productPrice,productQuantity);
    if(!toCart){
      res.writeHead(500,{'Content-Type':"application/json"});
      res.end(JSON.stringify({"message":`Failed to add item to cart for ${customerEmail}`}));
    }
    res.writeHead(200,{'Content-Type':'application/json'});
    res.end(JSON.stringify({"message":`Successfully added ${productName} to ${customerEmail} cart`,
                            "data": toCart}));
  } catch(error){
    res.writeHead(500,{'Content-Type':'application/json'});
    res.end(JSON.stringify({"error":error.message}));
  }
}

const removeFromCart = async(req,res)=>{
  try{
    const body = await getRequestBody(req);
    const{customerEmail,productID,productPrice,productName,productQuantity} = body;
    const fromCart = await orderModel.deleteFromCart(customerEmail,productID,productPrice,productQuantity);
    if(!fromCart){
      res.writeHead(500,{'Content-Type':"application/json"});
      res.end(JSON.stringify({"message":`Failed to remove item from cart for ${customerEmail}`}));
    }
    res.writeHead(200,{'Content-Type':'application/json'});
    res.end(JSON.stringify({"message":`Successfully remove ${productName} from ${customerEmail} cart`,
                            "data": fromCart}));
  } catch(error){
    res.writeHead(500,{'Content-Type':'application/json'});
    res.end(JSON.stringify({"error":error.message}));
  }
}

const getUnprocessedCart = async(req,res)=>{
  try{
    const body = await getRequestBody(req);
    const {customerEmail}=body;
    const queryCart = await orderModel.queryCurrentCart(customerEmail);
    
    res.writeHead(200,{'Content-Type':'application/json'});
    res.end(JSON.stringify({"message":`Successfully retrieve a cart for ${customerEmail}`,
                            "data": queryCart}));
  } catch(error){
    res.writeHead(500,{'Content-Type':'application/json'});
    res.end(JSON.stringify({"error":error.message}));
  }
}

const getUnprocessedOrder = async(req,res)=>{
  try{
    const body = await getRequestBody(req);
    const {customerEmail} = body;
    const queryOrder = await orderModel.queryUnprocessedOrder(customerEmail);

    es.writeHead(200,{'Content-Type':'application/json'});
    res.end(JSON.stringify({"message":`Successfully retrieve an unprocessed order for ${customerEmail}`,
                            "data": queryOrder}));
  } catch(error){
    res.writeHead(500,{'Content-Type':'application/json'});
    res.end(JSON.stringify({"error":error.message}));
  }
}

const processOrder = async(req,res)=>{
  try{
    const body = await getRequestBody(req);
    const {customerEmail} = body;
    const currTime = new Date();
    const formatDigit = (x) => x.toString().length === 1 ? '0' + x.toString() : x.toString();
    let orderDate = `${currTime.getFullYear()}-${formatDigit(currTime.getMonth()+1)}-${formatDigit(currTime.getDate())}`;
    const processing = await orderModel.updateBankBanlance(customerEmail,orderDate);

    if(!processing){
      res.writeHead(500,{'Content-Type':"application/json"});
      res.end(JSON.stringify({"message":`Failed to process order from ${customerEmail}'s cart`}));
    }
    res.writeHead(200,{'Content-Type':'application/json'});
    res.end(JSON.stringify({"message":`Successfully processing order from ${customerEmail}' cart`,
                            "data": processing}));
  } catch(error){
    res.writeHead(500,{'Content-Type':'application/json'});
    res.end(JSON.stringify({"error":error.message}));
  }
}
module.exports={
  createOrder,
  findOrder,
  getAllOrder,
  addToCart,
  removeFromCart,
  getUnprocessedCart,
  getUnprocessedOrder,
  processOrder
}