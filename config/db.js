require('dotenv').config();
const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.PORT || 3306,
    waitForConnections: true,
    ssl: process.env.DB_SSL_MODE === 'require' ? { rejectUnauthorized: true } : null
    // connectionLimit: 10,
    // queueLimit: 0
});

const dbInitializer = async (req, res) => {
    try {
        const queries = fs.readFileSync(path.join(__dirname, 'setup.sql'), 'utf-8').toString().split(';');

        for (const query of queries) {
            if (query.trim()){
                await pool.query(query);
            }
        }

        console.log('Successfully initialized database');
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Successfully initialized database' }));
    } catch (error) {
        console.error('Failed to initialize database', error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Failed to initialize database', details: error.message }));
    }
};

module.exports = {
    pool,
    dbInitializer
}
