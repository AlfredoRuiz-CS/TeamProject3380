const http = require('http');
const userController = require('./controllers/userController');

const server = http.createServer((req, res) => {
    if (req.url === '/login' && req.method === 'POST') {
        userController.loginAuth(req, res);
    }
    else if (req.url === '/register' && req.method === 'POST') {
        userController.registerAuth(req, res);
    }
    else if(req.url === '/api/users' && req.method === 'GET'){
        userController.getAllCustomers(req, res);
    }
    else if (req.url === '/api/newcard' && req.method === 'POST'){
        userController.updateUserPaymentInfo(req, res);
    }
    else{
        res.writeHead(404, { 'Content-Type' : 'application/json' })
        res.end(JSON.stringify({ message: 'Route Not Found'}))
    }
    
})

const PORT = process.env.PORT || 3306;

server.listen(PORT, () => console.log('Server running on port ${PORT}'));