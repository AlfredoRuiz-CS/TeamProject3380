const http = require('http');
const userController = require('./controllers/userController');

const server = http.createServer((req, res) => {
    if(req.url === '/api/users' && req.method === 'GET'){
        userController.getAllCustomers();
    }
    else{
        res.writeHead(404, { 'Content-Type' : 'application/json' })
        res.end(JSON.stringify({ message: 'Route Not Found'}))
    }
    
})

const PORT = process.env.PORT || 3306;

server.listen(PORT, () => console.log('Server running on port ${PORT}'));