// require('dotenv').config();
// const http = require('http');
// const { dbInitializer } = require('./config/db');
// const userController = require('./controllers/userController');

// const server = http.createServer((req, res) => {
//         // Set CORS headers
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

//     // Check for OPTIONS request (pre-flight request)
//     if (req.method === 'OPTIONS') {
//         res.writeHead(204);
//         res.end();
//         return;
//     }
//     if(req.url === '/' && req.method === 'GET'){
//         res.writeHead(200, { 'Content-Type' : 'application/json' });
//         res.end(JSON.stringify({ message: 'Server is running.'}))
//     }
//     else if(req.url === '/init-db' && req.method === 'GET'){
//         dbInitializer(req, res);
//     }
//     else if (req.url === '/login' && req.method === 'POST') {
//         userController.loginAuth(req, res);
//     }
//     else if (req.url === '/register' && req.method === 'POST') {
//         userController.registerAuth(req, res);
//     }
//     else if(req.url === '/api/users' && req.method === 'GET'){
//         userController.getAllCustomers(req, res);
//     }
//     else if (req.url === '/api/new_card' && req.method === 'POST'){
//         userController.updateUserPaymentInfo(req, res);
//     }
//     else if (req.url === '/api/payments' && req.method === 'POST'){
//         userController.getUserPaymentInfo(req, res);
//     }
//     else if (req.url === '/api/set_card' && req.method === 'POST'){
//         userController.createUserPaymentInfo(req, res);
//     }
//     else if (req.url === '/api/update_email' && req.method === 'POST'){
//         userController.updateUserEmail(req, res);
//     }
//     else if (req.url === '/api/update_password' && req.method === 'POST'){
//         userController.updateUserPassword(req, res);
//     }
//     else if (req.url === '/api/update_phone' && req.method === 'POST'){
//         userController.updateUserPhone(req, res);
//     }
//     else if (req.url === '/api/update_address' && req.method === 'POST'){
//         userController.updateUserAddress(req, res);
//     }
//     else if (req.url === '/api/update_name' && req.method === 'POST'){
//         userController.updateUserName(req, res);
//     }
//     else{
//         res.writeHead(404, { 'Content-Type' : 'application/json' })
//         res.end(JSON.stringify({ message: 'Route Not Found'}))
//     }
    
// })

// const PORT = process.env.HTTP_PORT || 4000;

// server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
//