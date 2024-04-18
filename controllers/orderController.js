const orderModel = require('../models/orderModel')
const memberModel = require('../models/memberModel');
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
    const {customerEmail,items,paymentMethod} = body;
    // const customerEmail = req.email;
    // const currTime = new Date();
    // const formatDigit = (x) => x.toString().length === 1 ? '0' + x.toString() : x.toString();
    // const orderDate = new Date().toISOString().split('T')[0];;
    // let normalD = `${currTime.getFullYear()}-${formatDigit(currTime.getMonth()+1)}-${formatDigit(currTime.getDate()+2)}`;
    // let fastD = `${currTime.getFullYear()}-${formatDigit(currTime.getMonth()+1)}-${formatDigit(currTime.getDate()+1)}`;

    //random date from 2023-01 to current date
    const formatDigit = (x) => (x < 10 ? '0' + x : x); // Simplified formatDigit function
    const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
    const currentDate = new Date();
    const lastYearDate = new Date(currentDate.getFullYear() - 1, 0, 1);
    const totalDays = Math.floor((currentDate - lastYearDate) / (1000 * 60 * 60 * 24));
    const randomDays = getRandomInt(0, totalDays);
    const randomDate = new Date(currentDate);
    randomDate.setDate(currentDate.getDate() - randomDays);
    // Calculate the order date
    const orderDate = `${randomDate.getFullYear()}-${formatDigit(randomDate.getMonth() + 1)}-${formatDigit(randomDate.getDate())}`;
    // Calculate dates for normalD and fastD
    const normalDate = new Date(randomDate.getTime()); // Create a new Date instance for normalD
    normalDate.setDate(randomDate.getDate() + 2); // Add two days
    let normalD = `${normalDate.getFullYear()}-${formatDigit(normalDate.getMonth() + 1)}-${formatDigit(normalDate.getDate())}`;  
    const fastDate = new Date(randomDate.getTime()); // Create a new Date instance for fastD
    fastDate.setDate(randomDate.getDate() + 1); // Add one day
    let fastD = `${fastDate.getFullYear()}-${formatDigit(fastDate.getMonth() + 1)}-${formatDigit(fastDate.getDate())}`;
    

    const order = await orderModel.createOrder(customerEmail,orderDate,items,paymentMethod,normalD,fastD);
    if(!order){
      res.writeHead(500,{'Content-Type':"application/json"});
      res.end(JSON.stringify({"message":`Failed to create order for ${customerEmail}`}));
      return;
    }
    const membershipStatus = await memberModel.getMembershipStatus(customerEmail);
    order.membershipStatus = membershipStatus

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
    const customerEmail = req.email;
    const order = await orderModel.findOrderDetail(orderID);
    if (!order){
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end("none");
      return; //exits if order is empty
    }
    const membershipStatus = await memberModel.getMembershipStatus(customerEmail);
    order.membershipStatus = membershipStatus
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
    const currTime = new Date();
    const formatDigit = (x) => x.toString().length === 1 ? '0' + x.toString() : x.toString();
    let stockDate = `${currTime.getFullYear()}-${formatDigit(currTime.getMonth()+1)}-${formatDigit(currTime.getDate())}`;
    const result = await orderModel.addingStock(stockDate,productName,quantity);
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