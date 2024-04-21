const memberModel = require('../models/memberModel')
const { getRequestBody } = require('../lib/requestBodyParser');

const getMembership = async(req,res)=>{
    try{
        const body = await getRequestBody(req);
        const {customerEmail,paymentMethod} = body;
        const currTime = new Date();
        const formatDigit = (x) => x.toString().length === 1 ? '0' + x.toString() : x.toString();
        let startDate = `${currTime.getFullYear()}-${formatDigit(currTime.getMonth()+1)}-${formatDigit(currTime.getDate())}`;
        let endDateObj = new Date(currTime.getFullYear(), currTime.getMonth() + 1, currTime.getDate());
        let endDate = `${endDateObj.getFullYear()}-${formatDigit(endDateObj.getMonth() + 1)}-${formatDigit(endDateObj.getDate())}`;
        let renewalDateObj = new Date(endDateObj);
        renewalDateObj.setDate(endDateObj.getDate() - 1);
        let renewalDate = `${renewalDateObj.getFullYear()}-${formatDigit(renewalDateObj.getMonth() + 1)}-${formatDigit(renewalDateObj.getDate())}`;

        const result = await memberModel.createMembership(customerEmail,startDate,endDate,renewalDate,paymentMethod);
        if(!result){
            res.writeHead(500,{'Content-Type':"application/json"});
            res.end(JSON.stringify({"message":`Failed to create membership for ${customerEmail}`}));
            return;
          }
          res.writeHead(200,{'Content-Type':'application/json'});
          res.end(JSON.stringify({"message":`Successfully create membership for ${customerEmail}`,
                                  "data": result}));
    } catch(error){
        res.writeHead(500,{'Content-Type':'application/json'});
        res.end(JSON.stringify({"error":error.message}));
      }
}

module.exports={
    getMembership
}