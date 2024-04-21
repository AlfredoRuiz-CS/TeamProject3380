const ShippingController = require("../../controllers/shippingController");
const { setCorsHeaders } = require("../../lib/cors");

module.exports = async (req, res) => {
    setCorsHeaders(req, res);
    if (req.method === "OPTIONS") {
        res.writeHead(204);
        res.end();
        return;
    }

    if (req.method === 'POST') {
        await ShippingController.createShippingInfo(req, res);
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Route Not Found' }));
    }
};
