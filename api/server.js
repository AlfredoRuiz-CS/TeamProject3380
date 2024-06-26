const { setCorsHeaders } = require("../../lib/cors");

module.exports = (req, res) => {
    setCorsHeaders(req, res);
    if (req.method === 'GET') {
        res.writeHead(200, { 'Content-Type' : 'application/json' });
        res.end(JSON.stringify({ message: 'Server is running.'}))
    } else {
        res.writeHead(404, { 'Content-Type' : 'application/json' })
        res.end(JSON.stringify({ message: 'Route Not Found'}))
    }
}