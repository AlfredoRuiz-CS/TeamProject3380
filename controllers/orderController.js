const orderModel = require('../models/orderModel')

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
        const{customerEmail, orderDate,items} = body;
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