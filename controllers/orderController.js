const orderModel = require('../models/orderModel')
const { getRequestBody } = require('../lib/requestBodyParser');


//get all orders with customer email
const getAllOrder = async (req,res) => {
  try{
    const allOrder = await orderModel.findAllOrder();
    if(!allOrder){
      res.writeHead(200,{'Content-Type': 'application/json'});
      res.end("none");
      return; //exits if there is no order
    }
    //else show all orders
    res.writeHead(200,{'Content-Type':'application/json'});
    res.end(JSON.stringify(allOrder));
  } catch (error) {
    res.writeHead(500, {'Content-Type': 'application/json' });
    res.end(JSON.stringify({"status": "Could not retrieve order information", "error" : error.message }));
    }
}

const processOrder = async(req,res)=>{
  try{
    const body = await getRequestBody(req);
    const {customerEmail,items} = body;
    const currTime = new Date();
    const formatDigit = (x) => x.toString().length === 1 ? '0' + x.toString() : x.toString();
    let orderDate = `${currTime.getFullYear()}-${formatDigit(currTime.getMonth()+1)}-${formatDigit(currTime.getDate())}`;
    const order = await orderModel.addtoOrder(customerEmail,orderDate,items);
    if(!order){
      res.writeHead(500,{'Content-Type':"application/json"});
      res.end(JSON.stringify({"message":`Failed to add item to order for ${customerEmail}`}));
      return;
    }
    res.writeHead(200,{'Content-Type':'application/json'});
    res.end(JSON.stringify({"message":`Successfully added items to ${customerEmail} order`,
                            "data": order}));
  } catch(error){
    res.writeHead(500,{'Content-Type':'application/json'});
    res.end(JSON.stringify({"error":error.message}));
  }
}

const removeFromOrder = async(req,res)=>{
  try{
    const body = await getRequestBody(req);
    const{customerEmail,productID,productPrice,productName,productQuantity,orderLineID} = body;
    const fromOrder = await orderModel.deleteFromOrder(customerEmail,productID,productPrice,productQuantity,orderLineID);
    if(!fromOrder){
      res.writeHead(500,{'Content-Type':"application/json"});
      res.end(JSON.stringify({"message":`Failed to remove item from cart for ${customerEmail}`}));
      return;
    }
    res.writeHead(200,{'Content-Type':'application/json'});
    res.end(JSON.stringify({"message":`Successfully remove ${productName} from ${customerEmail} cart`,
                            "data": fromOrder}));
  } catch(error){
    res.writeHead(500,{'Content-Type':'application/json'});
    res.end(JSON.stringify({"error":error.message}));
  }
}

//get order detail with orderID
const getOrderDetail = async (req,res) => {
  try{
    const body = await getRequestBody(req);
    const {orderID} = body;
    const order = await orderModel.findOrderDetail(orderID);
    if (!order){
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end("none");
      return; //exits if order is empty
    }
    //else shows order
    res.writeHead(200, { 'Content-Type' : 'application/json' });
    res.end(JSON.stringify(order));

    } catch (error) {
    res.writeHead(500, {'Content-Type': 'application/json' });
    res.end(JSON.stringify({"status": "Could not retrieve order information", "error" : error.message }));
    }
}

//get a specific order with orderID
const getProcessedOrderWithEmail = async (req,res) => {
  try{
    const body = await getRequestBody(req);
    const {customerEmail} = body;
    const order = await orderModel.findProcessedOrderbyEmail(customerEmail);
    if (!order){
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end("none");
      return; //exits if order is empty
    }
    //else shows order
    res.writeHead(200, { 'Content-Type' : 'application/json' });
    res.end(JSON.stringify(order));

    } catch (error) {
    res.writeHead(500, {'Content-Type': 'application/json' });
    res.end(JSON.stringify({"status": "Could not retrieve order information", "error" : error.message }));
    }
}

//get a specific order with orderID
const getAllOrderWithEmail = async (req,res) => {
  try{
    const body = await getRequestBody(req);
    const {customerEmail} = body;
    const order = await orderModel.findAllOrderbyEmail(customerEmail);
    if (!order){
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end("none");
      return; //exits if order is empty
    }
    //else shows order
    res.writeHead(200, { 'Content-Type' : 'application/json' });
    res.end(JSON.stringify(order));

    } catch (error) {
    res.writeHead(500, {'Content-Type': 'application/json' });
    res.end(JSON.stringify({"status": "Could not retrieve order information", "error" : error.message }));
    }
}

//get a specific order with orderID
const getOrderByLname = async (req,res) => {
  try{
    const body = await getRequestBody(req);
    const {lname} = body;
    const order = await orderModel.findOrderByLname(lname);
    if (!order){
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end("none");
      return; //exits if order is empty
    }
    //else shows order
    res.writeHead(200, { 'Content-Type' : 'application/json' });
    res.end(JSON.stringify(order));

    } catch (error) {
    res.writeHead(500, {'Content-Type': 'application/json' });
    res.end(JSON.stringify({"status": "Could not retrieve order information", "error" : error.message }));
    }
}

module.exports={
  getAllOrder,
  processOrder,
  removeFromOrder,
  getOrderDetail,
  getProcessedOrderWithEmail,
  getAllOrderWithEmail,
  getOrderByLname
}