const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'POS',
    port: process.env.PORT || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});