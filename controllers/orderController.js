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
    const {items,paymentMethod} = body;
    const customerEmail = req.email;
    const currTime = new Date();
    const formatDigit = (x) => x.toString().length === 1 ? '0' + x.toString() : x.toString();
    let orderDate = `${currTime.getFullYear()}-${formatDigit(currTime.getMonth()+1)}-${formatDigit(currTime.getDate())}`;
    const order = await orderModel.createOrder(customerEmail,orderDate,items,paymentMethod);
    if(!order){
      res.writeHead(500,{'Content-Type':"application/json"});
      res.end(JSON.stringify({"message":`Failed to create order for ${customerEmail}`}));
      return;
    }
    res.writeHead(200,{'Content-Type':'application/json'});
    res.end(JSON.stringify({"message":`Successfully creating an order for ${customerEmail}`,
                            "data": order}));
  } catch(error){
    res.writeHead(500,{'Content-Type':'application/json'});
    res.end(JSON.stringify({"error":error.message}));
  }
}

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

const getAllOrderWithEmail = async (req,res) => {
  try{
    const customerEmail = req.email;
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

const getOrderByLname = async (req,res) => {
  try {
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

const processRefund = async (req,res)=>{
  try{
    const body = await getRequestBody(req);
    const {orderID,items} = body;
    const currTime = new Date();
    const formatDigit = (x) => x.toString().length === 1 ? '0' + x.toString() : x.toString();
    let refundDate = `${currTime.getFullYear()}-${formatDigit(currTime.getMonth()+1)}-${formatDigit(currTime.getDate())}`;
    const refund = await orderModel.refundItems(orderID,items,refundDate);
    if (!refund){
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end("none");
      return; //exits if order is empty
    }
    //else shows order
    res.writeHead(200, { 'Content-Type' : 'application/json' });
    res.end(JSON.stringify(refund));

    } catch (error) {
    res.writeHead(500, {'Content-Type': 'application/json' });
    res.end(JSON.stringify({"status": "Could not process refund", "error" : error.message }));
  }
}

const getRefund = async (req,res)=>{
  try{
    const body = await getRequestBody(req);
    const{refundID} = body;
    const refundDetail = await orderModel.findRefund(refundID);
    if(!refundDetail){
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end("none");
      return; //exits if order is empty
    }
    //else shows order
    res.writeHead(200, { 'Content-Type' : 'application/json' });
    res.end(JSON.stringify(refundDetail));
  } catch (error) {
    res.writeHead(500, {'Content-Type': 'application/json' });
    res.end(JSON.stringify({"status": "Could not retrieve refund detail", "error" : error.message }));
  }
}

const addStock = async (req,res)=>{
  try{
    const body = await getRequestBody(req);
    const{productName,quantity}=body;
    const result = await orderModel.addingStock(productName,quantity);
    if(!result){
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end("none");
      return; //exits if empty
    }
    res.writeHead(200, { 'Content-Type' : 'application/json' });
    res.end(JSON.stringify(result));
  } catch (error) {
    res.writeHead(500, {'Content-Type': 'application/json' });
    res.end(JSON.stringify({"status": "Could not add more stock", "error" : error.message }));
  }
}
module.exports={
  getAllOrder,
  processOrder,
  getOrderDetail,
  getAllOrderWithEmail,
  getOrderByLname,
  processRefund,
  getRefund,
  addStock
}