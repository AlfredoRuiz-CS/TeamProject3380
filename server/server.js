const http = require('http');

const server = http.createServer((req, res) => {
    if(req.url === '/api/users' && req.method === 'GET'){
        res.writeHead(200, { 'Content-Type' : 'application/json' })
        res.end(JSON.stringify());
    }
    else{
        res.writeHead(404, { 'Content-Type' : 'application/json' })
        res.end(JSON.stringify({ message: 'Route Not Found'}))
    }
    
})

const PORT = process.env.PORT || 3306;

server.listen(PORT, () => console.log('Server running on port ${PORT}'));