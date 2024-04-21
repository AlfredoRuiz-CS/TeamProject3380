const reportModel = require('../models/reportModel')
const { getRequestBody } = require('../lib/requestBodyParser');

const getReport = async(req,res)=>{
    try{
        const body = await getRequestBody(req);
        const {startDate,endDate}=body;
        const result = await reportModel.netSales(startDate,endDate);
        if(!result){
            res.writeHead(500,{'Content-Type':"application/json"});
            res.end(JSON.stringify({"message":`Failed to get report`}));
            return;
          }
        res.writeHead(200,{'Content-Type':'application/json'});
        res.end(JSON.stringify({"message":`Here is the report`,
                                  "data": result}));
    } catch(error){
      res.writeHead(500,{'Content-Type':'application/json'});
      res.end(JSON.stringify({"error":error.message}));
    }
}

// const getReport = async (req, res) => {
//   try {
//     const body = await getRequestBody(req);
//     const { startDate, endDate } = body;
//     const result = await reportModel.generateReport(startDate, endDate);
//     if (!result) {
//       res.writeHead(500, { 'Content-Type': "application/json" });
//       res.end(JSON.stringify({ "message": `Failed to get report` }));
//       return;
//     }
//     res.writeHead(200, { 'Content-Type': 'application/json' });
//     res.end(JSON.stringify({
//       "message": `Here is the report`,
//       "data": result
//     }));
//   } catch (error) {
//     res.writeHead(500, { 'Content-Type': 'application/json' });
//     res.end(JSON.stringify({ "error": error.message }));
//   }
// }

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

const getGrossSalesWeek = async(req,res)=>{
  try{
    const formatDigit = (x) => (x < 10 ? '0' + x : x); // Simplified formatDigit function
    const endDate = new Date(); // End date is the current date
    const startDate = new Date(endDate); // Copy endDate to startDate
    startDate.setDate(endDate.getDate() - 6); // Subtract 6 to ensure a total of 7 days including the endDate
    let sDate = `${startDate.getFullYear()}-${formatDigit(startDate.getMonth() + 1)}-${formatDigit(startDate.getDate())}`; 
    let eDate = `${endDate.getFullYear()}-${formatDigit(endDate.getMonth() + 1)}-${formatDigit(endDate.getDate())}`;  

    const result = await reportModel.grossSales(startDate,endDate);
    if(!result) {
      res.writeHead(500,{'Content-Type':"application/json"});
      res.end(JSON.stringify({"message":`Failed to get gross sale report`}));
      return;
    }
    res.writeHead(200,{'Content-Type':'application/json'});
    res.end(JSON.stringify({"message":`Here is the gross sale report`,
                            "result": result}));

  } catch(error){
    res.writeHead(500,{'Content-Type':'application/json'});
    res.end(JSON.stringify({"error":error.message}));
    }
}

const getNetSalesWeek = async(req,res)=>{
  try{
    const formatDigit = (x) => (x < 10 ? '0' + x : x); // Simplified formatDigit function
    const endDate = new Date(); // End date is the current date
    const startDate = new Date(endDate); // Copy endDate to startDate
    startDate.setDate(endDate.getDate() - 6); // Subtract 6 to ensure a total of 7 days including the endDate
    let sDate = `${startDate.getFullYear()}-${formatDigit(startDate.getMonth() + 1)}-${formatDigit(startDate.getDate())}`; 
    let eDate = `${endDate.getFullYear()}-${formatDigit(endDate.getMonth() + 1)}-${formatDigit(endDate.getDate())}`;  

    const result = await reportModel.netSales(startDate,endDate);
    if(!result) {
      res.writeHead(500,{'Content-Type':"application/json"});
      res.end(JSON.stringify({"message":`Failed to get net sale report`}));
      return;
    }
    res.writeHead(200,{'Content-Type':'application/json'});
    res.end(JSON.stringify({"message":`Here is the net sale report`,
                            "result": result}));

  } catch(error){
    res.writeHead(500,{'Content-Type':'application/json'});
    res.end(JSON.stringify({"error":error.message}));
    }
}

const getGrossSalesDay = async (req,res) => {
  try{
    const formatDigit = (x) => (x < 10 ? '0' + x : x); // Simplified formatDigit function
    const endDate = new Date(); // End date is the current date
    const startDate = new Date(endDate); // Copy endDate to startDate
    startDate.setHours(0, 0, 0, 0); // Set time to 00:00:00.000 to start the day
    let sDate = `${startDate.getFullYear()}-${formatDigit(startDate.getMonth() + 1)}-${formatDigit(startDate.getDate())}`; 
    let eDate = `${endDate.getFullYear()}-${formatDigit(endDate.getMonth() + 1)}-${formatDigit(endDate.getDate())}`;  

    const result = await reportModel.grossSales(startDate,endDate);
    if(!result) {
      res.writeHead(500,{'Content-Type':"application/json"});
      res.end(JSON.stringify({"message":`Failed to get net sale report`}));
      return;
    }
    res.writeHead(200,{'Content-Type':'application/json'});
    res.end(JSON.stringify({"message":`Here is the net sale report`,
                            "result": result}));

  } catch(error){
    res.writeHead(500,{'Content-Type':'application/json'});
    res.end(JSON.stringify({"error":error.message}));
    }
}

const getNetSalesDay = async (req,res) => {
  try{
    const formatDigit = (x) => (x < 10 ? '0' + x : x); // Simplified formatDigit function
    const endDate = new Date(); // End date is the current date
    const startDate = new Date(endDate); // Copy endDate to startDate
    startDate.setHours(0, 0, 0, 0); // Set time to 00:00:00.000 to start the day
    let sDate = `${startDate.getFullYear()}-${formatDigit(startDate.getMonth() + 1)}-${formatDigit(startDate.getDate())}`; 
    let eDate = `${endDate.getFullYear()}-${formatDigit(endDate.getMonth() + 1)}-${formatDigit(endDate.getDate())}`;  

    const result = await reportModel.netSales(startDate,endDate);
    if(!result) {
      res.writeHead(500,{'Content-Type':"application/json"});
      res.end(JSON.stringify({"message":`Failed to get net sale report`}));
      return;
    }
    res.writeHead(200,{'Content-Type':'application/json'});
    res.end(JSON.stringify({"message":`Here is the net sale report`,
                            "result": result}));

  } catch(error){
    res.writeHead(500,{'Content-Type':'application/json'});
    res.end(JSON.stringify({"error":error.message}));
    }
}

const getGrossSalesMonth = async(req,res)=>{
  try{
    const formatDigit = (x) => (x < 10 ? '0' + x : x); // Simplified formatDigit function
    const endDate = new Date(); // End date is the current date
    const startDate = new Date(endDate); // Copy endDate to startDate
    startDate.setMonth(endDate.getMonth() - 1); // Subtract 6 to ensure a total of 7 days including the endDate
    let sDate = `${startDate.getFullYear()}-${formatDigit(startDate.getMonth() + 1)}-${formatDigit(startDate.getDate())}`; 
    let eDate = `${endDate.getFullYear()}-${formatDigit(endDate.getMonth() + 1)}-${formatDigit(endDate.getDate())}`;  

    const result = await reportModel.grossSales(startDate,endDate);
    if(!result) {
      res.writeHead(500,{'Content-Type':"application/json"});
      res.end(JSON.stringify({"message":`Failed to get net sale report`}));
      return;
    }
    res.writeHead(200,{'Content-Type':'application/json'});
    res.end(JSON.stringify({"message":`Here is the net sale report`,
                            "result": result}));

  } catch(error){
    res.writeHead(500,{'Content-Type':'application/json'});
    res.end(JSON.stringify({"error":error.message}));
    }
}

const getNetSalesMonth = async(req,res)=>{
  try{
    const formatDigit = (x) => (x < 10 ? '0' + x : x); // Simplified formatDigit function
    const endDate = new Date(); // End date is the current date
    const startDate = new Date(endDate); // Copy endDate to startDate
    startDate.setMonth(endDate.getMonth() - 1); // Subtract 6 to ensure a total of 7 days including the endDate
    let sDate = `${startDate.getFullYear()}-${formatDigit(startDate.getMonth() + 1)}-${formatDigit(startDate.getDate())}`; 
    let eDate = `${endDate.getFullYear()}-${formatDigit(endDate.getMonth() + 1)}-${formatDigit(endDate.getDate())}`;  

    const result = await reportModel.netSales(startDate,endDate);
    if(!result) {
      res.writeHead(500,{'Content-Type':"application/json"});
      res.end(JSON.stringify({"message":`Failed to get net sale report`}));
      return;
    }
    res.writeHead(200,{'Content-Type':'application/json'});
    res.end(JSON.stringify({"message":`Here is the net sale report`,
                            "result": result}));

  } catch(error){
    res.writeHead(500,{'Content-Type':'application/json'});
    res.end(JSON.stringify({"error":error.message}));
    }
}

const getGrossSalesCustomD = async(req,res)=>{
  try{
    const body = await getRequestBody(req);
    const {startDate,endDate}=body;
    const result = await reportModel.grossSales(startDate,endDate);
    if(!result) {
      res.writeHead(500,{'Content-Type':"application/json"});
      res.end(JSON.stringify({"message":`Failed to get gross sale report`}));
      return;
    }
    res.writeHead(200,{'Content-Type':'application/json'});
    res.end(JSON.stringify({"message":`Here is the gross sale report`,
                            "result": result}));

  } catch(error){
    res.writeHead(500,{'Content-Type':'application/json'});
    res.end(JSON.stringify({"error":error.message}));
    }
}

const getNetSalesCustomD = async(req,res)=>{
  try{
    const body = await getRequestBody(req);
    const {startDate,endDate}=body;
    const result = await reportModel.netSales(startDate,endDate);
    if(!result) {
      res.writeHead(500,{'Content-Type':"application/json"});
      res.end(JSON.stringify({"message":`Failed to get net sale report`}));
      return;
    }
    res.writeHead(200,{'Content-Type':'application/json'});
    res.end(JSON.stringify({"message":`Here is the net sale report`,
                            "result": result}));

  } catch(error){
    res.writeHead(500,{'Content-Type':'application/json'});
    res.end(JSON.stringify({"error":error.message}));
    }
}

const getMemberSalesDay = async(req,res)=>{
  try{
    const formatDigit = (x) => (x < 10 ? '0' + x : x); // Simplified formatDigit function
    const endDate = new Date(); // End date is the current date
    const startDate = new Date(endDate); // Copy endDate to startDate
    startDate.setHours(0, 0, 0, 0); // Set time to 00:00:00.000 to start the day
    let sDate = `${startDate.getFullYear()}-${formatDigit(startDate.getMonth() + 1)}-${formatDigit(startDate.getDate())}`; 
    let eDate = `${endDate.getFullYear()}-${formatDigit(endDate.getMonth() + 1)}-${formatDigit(endDate.getDate())}`;  
    const result = await reportModel.membershipSales(startDate,endDate);
    if(!result) {
      res.writeHead(500,{'Content-Type':"application/json"});
      res.end(JSON.stringify({"message":`Failed to get member sale report`}));
      return;
    }
    res.writeHead(200,{'Content-Type':'application/json'});
    res.end(JSON.stringify({"message":`Here is the member sale report`,
                            "result": result}));

  } catch(error){
    res.writeHead(500,{'Content-Type':'application/json'});
    res.end(JSON.stringify({"error":error.message}));
    }
}
const getMemberSalesWeek = async(req,res)=>{
  try{
    const formatDigit = (x) => (x < 10 ? '0' + x : x); // Simplified formatDigit function
    const endDate = new Date(); // End date is the current date
    const startDate = new Date(endDate); // Copy endDate to startDate
    startDate.setDate(endDate.getDate() - 6); // Subtract 6 to ensure a total of 7 days including the endDate
    let sDate = `${startDate.getFullYear()}-${formatDigit(startDate.getMonth() + 1)}-${formatDigit(startDate.getDate())}`; 
    let eDate = `${endDate.getFullYear()}-${formatDigit(endDate.getMonth() + 1)}-${formatDigit(endDate.getDate())}`;  

    const result = await reportModel.membershipSales(startDate,endDate);
    if(!result) {
      res.writeHead(500,{'Content-Type':"application/json"});
      res.end(JSON.stringify({"message":`Failed to get member sale report`}));
      return;
    }
    res.writeHead(200,{'Content-Type':'application/json'});
    res.end(JSON.stringify({"message":`Here is the member sale report`,
                            "result": result}));

  } catch(error){
    res.writeHead(500,{'Content-Type':'application/json'});
    res.end(JSON.stringify({"error":error.message}));
    }
}
const getMemberSalesMonth = async(req,res)=>{
  try{
    const formatDigit = (x) => (x < 10 ? '0' + x : x); // Simplified formatDigit function
    const endDate = new Date(); // End date is the current date
    const startDate = new Date(endDate); // Copy endDate to startDate
    startDate.setMonth(endDate.getMonth() - 1); // Subtract 6 to ensure a total of 7 days including the endDate
    let sDate = `${startDate.getFullYear()}-${formatDigit(startDate.getMonth() + 1)}-${formatDigit(startDate.getDate())}`; 
    let eDate = `${endDate.getFullYear()}-${formatDigit(endDate.getMonth() + 1)}-${formatDigit(endDate.getDate())}`;  

    const result = await reportModel.membershipSales(startDate,endDate);
    if(!result) {
      res.writeHead(500,{'Content-Type':"application/json"});
      res.end(JSON.stringify({"message":`Failed to get member sale report`}));
      return;
    }
    res.writeHead(200,{'Content-Type':'application/json'});
    res.end(JSON.stringify({"message":`Here is the member sale report`,
                            "result": result}));

  } catch(error){
    res.writeHead(500,{'Content-Type':'application/json'});
    res.end(JSON.stringify({"error":error.message}));
    }
}

const getMemberSalesCustomDate = async(req,res)=>{
  try{
    const body = await getRequestBody(req);
    const {startDate,endDate}=body;
    const result = await reportModel.membershipSales(startDate,endDate);
    if(!result) {
      res.writeHead(500,{'Content-Type':"application/json"});
      res.end(JSON.stringify({"message":`Failed to get member sale report`}));
      return;
    }
    res.writeHead(200,{'Content-Type':'application/json'});
    res.end(JSON.stringify({"message":`Here is the member sale report`,
                            "result": result}));

  } catch(error){
    res.writeHead(500,{'Content-Type':'application/json'});
    res.end(JSON.stringify({"error":error.message}));
    }
}

const getRefundReportDay = async(req,res)=>{
  try{
    const formatDigit = (x) => (x < 10 ? '0' + x : x); // Simplified formatDigit function
    const endDate = new Date(); // End date is the current date
    const startDate = new Date(endDate); // Copy endDate to startDate
    startDate.setHours(0, 0, 0, 0); // Set time to 00:00:00.000 to start the day
    let sDate = `${startDate.getFullYear()}-${formatDigit(startDate.getMonth() + 1)}-${formatDigit(startDate.getDate())}`; 
    let eDate = `${endDate.getFullYear()}-${formatDigit(endDate.getMonth() + 1)}-${formatDigit(endDate.getDate())}`;  
    const result = await reportModel.refundReport(startDate,endDate);
    if(!result) {
      res.writeHead(500,{'Content-Type':"application/json"});
      res.end(JSON.stringify({"message":`Failed to get refund report`}));
      return;
    }
    res.writeHead(200,{'Content-Type':'application/json'});
    res.end(JSON.stringify({"message":`Here is the refund report`,
                            "result": result}));

  } catch(error){
    res.writeHead(500,{'Content-Type':'application/json'});
    res.end(JSON.stringify({"error":error.message}));
    }
}

const getRefundReportWeek = async(req,res)=>{
  try{
    const formatDigit = (x) => (x < 10 ? '0' + x : x); // Simplified formatDigit function
    const endDate = new Date(); // End date is the current date
    const startDate = new Date(endDate); // Copy endDate to startDate
    startDate.setDate(endDate.getDate() - 6); // Subtract 6 to ensure a total of 7 days including the endDate
    let sDate = `${startDate.getFullYear()}-${formatDigit(startDate.getMonth() + 1)}-${formatDigit(startDate.getDate())}`; 
    let eDate = `${endDate.getFullYear()}-${formatDigit(endDate.getMonth() + 1)}-${formatDigit(endDate.getDate())}`;  
    const result = await reportModel.refundReport(startDate,endDate);
    if(!result) {
      res.writeHead(500,{'Content-Type':"application/json"});
      res.end(JSON.stringify({"message":`Failed to get refund report`}));
      return;
    }
    res.writeHead(200,{'Content-Type':'application/json'});
    res.end(JSON.stringify({"message":`Here is the refund report`,
                            "result": result}));

  } catch(error){
    res.writeHead(500,{'Content-Type':'application/json'});
    res.end(JSON.stringify({"error":error.message}));
    }
}

const getRefundReportMonth = async(req,res)=>{
  try{
    const formatDigit = (x) => (x < 10 ? '0' + x : x); // Simplified formatDigit function
    const endDate = new Date(); // End date is the current date
    const startDate = new Date(endDate); // Copy endDate to startDate
    startDate.setMonth(endDate.getMonth() - 1); // Subtract 6 to ensure a total of 7 days including the endDate
    let sDate = `${startDate.getFullYear()}-${formatDigit(startDate.getMonth() + 1)}-${formatDigit(startDate.getDate())}`; 
    let eDate = `${endDate.getFullYear()}-${formatDigit(endDate.getMonth() + 1)}-${formatDigit(endDate.getDate())}`;  
    const result = await reportModel.refundReport(startDate,endDate);

    if(!result) {
      res.writeHead(500,{'Content-Type':"application/json"});
      res.end(JSON.stringify({"message":`Failed to get refund report`}));
      return;
    }
    res.writeHead(200,{'Content-Type':'application/json'});
    res.end(JSON.stringify({"message":`Here is the refund report`,
                            "result": result}));

  } catch(error){
    res.writeHead(500,{'Content-Type':'application/json'});
    res.end(JSON.stringify({"error":error.message}));
    }
}

const getRefundReportCustomDate = async(req,res)=>{
  try{
    const body = await getRequestBody(req);
    const {startDate,endDate}=body;
    const result = await reportModel.refundReport(startDate,endDate);

    if(!result) {
      res.writeHead(500,{'Content-Type':"application/json"});
      res.end(JSON.stringify({"message":`Failed to get refund report`}));
      return;
    }
    res.writeHead(200,{'Content-Type':'application/json'});
    res.end(JSON.stringify({"message":`Here is the refund report`,
                            "result": result}));

  } catch(error){
    res.writeHead(500,{'Content-Type':'application/json'});
    res.end(JSON.stringify({"error":error.message}));
    }
}

const getAvgPurchaseValueD = async(req,res)=>{
  try{
    const formatDigit = (x) => (x < 10 ? '0' + x : x); // Simplified formatDigit function
    const endDate = new Date(); // End date is the current date
    const startDate = new Date(endDate); // Copy endDate to startDate
    startDate.setHours(0, 0, 0, 0); // Set time to 00:00:00.000 to start the day
    let sDate = `${startDate.getFullYear()}-${formatDigit(startDate.getMonth() + 1)}-${formatDigit(startDate.getDate())}`; 
    let eDate = `${endDate.getFullYear()}-${formatDigit(endDate.getMonth() + 1)}-${formatDigit(endDate.getDate())}`;  
    const result = await reportModel.averagePurchaseValue(startDate,endDate);

    if(!result) {
      res.writeHead(500,{'Content-Type':"application/json"});
      res.end(JSON.stringify({"message":`Failed to get AVG purchase report`}));
      return;
    }
    res.writeHead(200,{'Content-Type':'application/json'});
    res.end(JSON.stringify({"message":`Here is the AVG purchase report`,
                            "result": result}));

  } catch(error){
    res.writeHead(500,{'Content-Type':'application/json'});
    res.end(JSON.stringify({"error":error.message}));
    }
}

const getAvgPurchaseValueW = async(req,res)=>{
  try{
    const formatDigit = (x) => (x < 10 ? '0' + x : x); // Simplified formatDigit function
    const endDate = new Date(); // End date is the current date
    const startDate = new Date(endDate); // Copy endDate to startDate
    startDate.setDate(endDate.getDate() - 6); // Subtract 6 to ensure a total of 7 days including the endDate
    let sDate = `${startDate.getFullYear()}-${formatDigit(startDate.getMonth() + 1)}-${formatDigit(startDate.getDate())}`; 
    let eDate = `${endDate.getFullYear()}-${formatDigit(endDate.getMonth() + 1)}-${formatDigit(endDate.getDate())}`;  
    const result = await reportModel.averagePurchaseValue(startDate,endDate);

    if(!result) {
      res.writeHead(500,{'Content-Type':"application/json"});
      res.end(JSON.stringify({"message":`Failed to get AVG purchase report`}));
      return;
    }
    res.writeHead(200,{'Content-Type':'application/json'});
    res.end(JSON.stringify({"message":`Here is the AVG purchase report`,
                            "result": result}));

  } catch(error){
    res.writeHead(500,{'Content-Type':'application/json'});
    res.end(JSON.stringify({"error":error.message}));
    }
}

const getAvgPurchaseValueM = async(req,res)=>{
  try{
    const formatDigit = (x) => (x < 10 ? '0' + x : x); // Simplified formatDigit function
    const endDate = new Date(); // End date is the current date
    const startDate = new Date(endDate); // Copy endDate to startDate
    startDate.setMonth(endDate.getMonth() - 1); // Subtract 6 to ensure a total of 7 days including the endDate
    let sDate = `${startDate.getFullYear()}-${formatDigit(startDate.getMonth() + 1)}-${formatDigit(startDate.getDate())}`; 
    let eDate = `${endDate.getFullYear()}-${formatDigit(endDate.getMonth() + 1)}-${formatDigit(endDate.getDate())}`;  
    const result = await reportModel.averagePurchaseValue(startDate,endDate);

    if(!result) {
      res.writeHead(500,{'Content-Type':"application/json"});
      res.end(JSON.stringify({"message":`Failed to get AVG purchase report`}));
      return;
    }
    res.writeHead(200,{'Content-Type':'application/json'});
    res.end(JSON.stringify({"message":`Here is the AVG purchase report`,
                            "result": result}));

  } catch(error){
    res.writeHead(500,{'Content-Type':'application/json'});
    res.end(JSON.stringify({"error":error.message}));
    }
}

const getAvgPurchaseValueCustomD = async(req,res)=>{
  try{
    const body = await getRequestBody(req);
    const {startDate,endDate}=body;
    console.log(startDate,endDate);
    const result = await reportModel.averagePurchaseValue(startDate,endDate);

    if(!result) {
      res.writeHead(500,{'Content-Type':"application/json"});
      res.end(JSON.stringify({"message":`Failed to get AVG purchase report`}));
      return;
    }
    res.writeHead(200,{'Content-Type':'application/json'});
    res.end(JSON.stringify({"message":`Here is the AVG purchase report`,
                            "result": result}));

  } catch(error){
    res.writeHead(500,{'Content-Type':'application/json'});
    res.end(JSON.stringify({"error":error.message}));
    }
}

const getMostPurchaseD = async(req,res)=>{
  try{
    const formatDigit = (x) => (x < 10 ? '0' + x : x); // Simplified formatDigit function
    const endDate = new Date(); // End date is the current date
    const startDate = new Date(endDate); // Copy endDate to startDate
    startDate.setHours(0, 0, 0, 0); // Set time to 00:00:00.000 to start the day
    let sDate = `${startDate.getFullYear()}-${formatDigit(startDate.getMonth() + 1)}-${formatDigit(startDate.getDate())}`; 
    let eDate = `${endDate.getFullYear()}-${formatDigit(endDate.getMonth() + 1)}-${formatDigit(endDate.getDate())}`;  
    const result = await reportModel.mostPurchaseDated(startDate,endDate);

    if(!result) {
      res.writeHead(500,{'Content-Type':"application/json"});
      res.end(JSON.stringify({"message":`Failed to get most purchase report`}));
      return;
    }
    res.writeHead(200,{'Content-Type':'application/json'});
    res.end(JSON.stringify({"message":`Here is the most purchase report`,
                            "result": result}));

  } catch(error){
    res.writeHead(500,{'Content-Type':'application/json'});
    res.end(JSON.stringify({"error":error.message}));
    }
}

const getMostPurchaseW = async(req,res)=>{
  try{
    const formatDigit = (x) => (x < 10 ? '0' + x : x); // Simplified formatDigit function
    const endDate = new Date(); // End date is the current date
    const startDate = new Date(endDate); // Copy endDate to startDate
    startDate.setDate(endDate.getDate() - 6); // Subtract 6 to ensure a total of 7 days including the endDate
    let sDate = `${startDate.getFullYear()}-${formatDigit(startDate.getMonth() + 1)}-${formatDigit(startDate.getDate())}`; 
    let eDate = `${endDate.getFullYear()}-${formatDigit(endDate.getMonth() + 1)}-${formatDigit(endDate.getDate())}`;  
    const result = await reportModel.mostPurchaseDated(startDate,endDate);

    if(!result) {
      res.writeHead(500,{'Content-Type':"application/json"});
      res.end(JSON.stringify({"message":`Failed to get most purchase report`}));
      return;
    }
    res.writeHead(200,{'Content-Type':'application/json'});
    res.end(JSON.stringify({"message":`Here is the most purchase report`,
                            "result": result}));

  } catch(error){
    res.writeHead(500,{'Content-Type':'application/json'});
    res.end(JSON.stringify({"error":error.message}));
    }
}

const getMostPurchaseM = async(req,res)=>{
  try{
    const formatDigit = (x) => (x < 10 ? '0' + x : x); // Simplified formatDigit function
    const endDate = new Date(); // End date is the current date
    const startDate = new Date(endDate); // Copy endDate to startDate
    startDate.setMonth(endDate.getMonth() - 1); // Subtract 6 to ensure a total of 7 days including the endDate
    let sDate = `${startDate.getFullYear()}-${formatDigit(startDate.getMonth() + 1)}-${formatDigit(startDate.getDate())}`; 
    let eDate = `${endDate.getFullYear()}-${formatDigit(endDate.getMonth() + 1)}-${formatDigit(endDate.getDate())}`;  
    const result = await reportModel.mostPurchaseDated(startDate,endDate);

    if(!result) {
      res.writeHead(500,{'Content-Type':"application/json"});
      res.end(JSON.stringify({"message":`Failed to get most purchase report`}));
      return;
    }
    res.writeHead(200,{'Content-Type':'application/json'});
    res.end(JSON.stringify({"message":`Here is the most purchase report`,
                            "result": result}));

  } catch(error){
    res.writeHead(500,{'Content-Type':'application/json'});
    res.end(JSON.stringify({"error":error.message}));
    }
}

const getMostPurchaseCustomD = async(req,res)=>{
  try{
    const body = await getRequestBody(req);
    const {startDate,endDate}=body;
    const result = await reportModel.mostPurchase(startDate,endDate);

    if(!result) {
      res.writeHead(500,{'Content-Type':"application/json"});
      res.end(JSON.stringify({"message":`Failed to get most purchase report`}));
      return;
    }
    res.writeHead(200,{'Content-Type':'application/json'});
    res.end(JSON.stringify({"message":`Here is the most purchase report`,
                            "result": result}));

  } catch(error){
    res.writeHead(500,{'Content-Type':'application/json'});
    res.end(JSON.stringify({"error":error.message}));
    }
}

const getLeastPurchaseD = async(req,res)=>{
  try{
    const formatDigit = (x) => (x < 10 ? '0' + x : x); // Simplified formatDigit function
    const endDate = new Date(); // End date is the current date
    const startDate = new Date(endDate); // Copy endDate to startDate
    startDate.setHours(0, 0, 0, 0); // Set time to 00:00:00.000 to start the day
    let sDate = `${startDate.getFullYear()}-${formatDigit(startDate.getMonth() + 1)}-${formatDigit(startDate.getDate())}`; 
    let eDate = `${endDate.getFullYear()}-${formatDigit(endDate.getMonth() + 1)}-${formatDigit(endDate.getDate())}`;  
    const result = await reportModel.leastPurchaseDated(startDate,endDate);

    if(!result) {
      res.writeHead(500,{'Content-Type':"application/json"});
      res.end(JSON.stringify({"message":`Failed to get least purchase report`}));
      return;
    }
    res.writeHead(200,{'Content-Type':'application/json'});
    res.end(JSON.stringify({"message":`Here is the least purchase report`,
                            "result": result}));

  } catch(error){
    res.writeHead(500,{'Content-Type':'application/json'});
    res.end(JSON.stringify({"error":error.message}));
    }
}

const getLeastPurchaseW = async(req,res)=>{
  try{
    const formatDigit = (x) => (x < 10 ? '0' + x : x); // Simplified formatDigit function
    const endDate = new Date(); // End date is the current date
    const startDate = new Date(endDate); // Copy endDate to startDate
    startDate.setDate(endDate.getDate() - 6); // Subtract 6 to ensure a total of 7 days including the endDate
    let sDate = `${startDate.getFullYear()}-${formatDigit(startDate.getMonth() + 1)}-${formatDigit(startDate.getDate())}`; 
    let eDate = `${endDate.getFullYear()}-${formatDigit(endDate.getMonth() + 1)}-${formatDigit(endDate.getDate())}`;  
    const result = await reportModel.leastPurchaseDated(startDate,endDate);

    if(!result) {
      res.writeHead(500,{'Content-Type':"application/json"});
      res.end(JSON.stringify({"message":`Failed to get least purchase report`}));
      return;
    }
    res.writeHead(200,{'Content-Type':'application/json'});
    res.end(JSON.stringify({"message":`Here is the least purchase report`,
                            "result": result}));

  } catch(error){
    res.writeHead(500,{'Content-Type':'application/json'});
    res.end(JSON.stringify({"error":error.message}));
    }
}

const getLeastPurchaseM = async(req,res)=>{
  try{
    const formatDigit = (x) => (x < 10 ? '0' + x : x); // Simplified formatDigit function
    const endDate = new Date(); // End date is the current date
    const startDate = new Date(endDate); // Copy endDate to startDate
    startDate.setMonth(endDate.getMonth() - 1); // Subtract 6 to ensure a total of 7 days including the endDate
    let sDate = `${startDate.getFullYear()}-${formatDigit(startDate.getMonth() + 1)}-${formatDigit(startDate.getDate())}`; 
    let eDate = `${endDate.getFullYear()}-${formatDigit(endDate.getMonth() + 1)}-${formatDigit(endDate.getDate())}`;  
    const result = await reportModel.leastPurchaseDated(startDate,endDate);

    if(!result) {
      res.writeHead(500,{'Content-Type':"application/json"});
      res.end(JSON.stringify({"message":`Failed to get least purchase report`}));
      return;
    }
    res.writeHead(200,{'Content-Type':'application/json'});
    res.end(JSON.stringify({"message":`Here is the least purchase report`,
                            "result": result}));

  } catch(error){
    res.writeHead(500,{'Content-Type':'application/json'});
    res.end(JSON.stringify({"error":error.message}));
    }
}

const getLeastPurchaseCustomD = async(req,res)=>{
  try{
    const body = await getRequestBody(req);
    const {startDate,endDate}=body;
    const result = await reportModel.leastPurchase(startDate,endDate);

    if(!result) {
      res.writeHead(500,{'Content-Type':"application/json"});
      res.end(JSON.stringify({"message":`Failed to get least purchase report`}));
      return;
    }
    res.writeHead(200,{'Content-Type':'application/json'});
    res.end(JSON.stringify({"message":`Here is the least purchase report`,
                            "result": result}));

  } catch(error){
    res.writeHead(500,{'Content-Type':'application/json'});
    res.end(JSON.stringify({"error":error.message}));
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
    const totalInventory = await reportModel.getTotalInventory();
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
    const inventoryByWeek = await reportModel.getInventoryByWeek(startDate, endDate, productId);
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
    const inventoryByDay = await reportModel.getInventoryByDay(date, productId);
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
    const inventoryByMonth = await reportModel.getInventoryByMonth(month, year, productId);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ "inventoryByMonth": inventoryByMonth }));
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ "error": error.message }));
  }
}

module.exports={
  getReport,
  getSoldProducts,
  getRefundedProducts,
  getGrossSalesDay, getGrossSalesWeek, getGrossSalesMonth, getGrossSalesCustomD,
  getNetSalesDay, getNetSalesWeek, getNetSalesMonth, getNetSalesCustomD,
  getMemberSalesDay, getMemberSalesWeek, getMemberSalesMonth, getMemberSalesCustomDate,
  getRefundReportDay, getRefundReportWeek, getRefundReportMonth, getRefundReportCustomDate,
  getAvgPurchaseValueD, getAvgPurchaseValueW, getAvgPurchaseValueM, getAvgPurchaseValueCustomD,
  getMostPurchaseD, getMostPurchaseW, getMostPurchaseM, getMostPurchaseCustomD,
  getLeastPurchaseD, getLeastPurchaseW, getLeastPurchaseM, getLeastPurchaseCustomD,
  getSoldProducts,getRefundedProducts, 
  getTotalInventory, getInventoryByMonth, getInventoryByDay, getInventoryByWeek,
  addProductToInventory
}
