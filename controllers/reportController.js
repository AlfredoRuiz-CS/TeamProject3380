const reportModel = require('../models/reportModel')
const { getRequestBody } = require('../lib/requestBodyParser');

const getReport = async(req,res)=>{
    try{
        const body = await getRequestBody(req);
        const {startDate,endDate}=body;
        const result = await reportModel.generateReport(startDate,endDate);
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

module.exports={
    getReport
}