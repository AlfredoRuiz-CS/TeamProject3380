const jwt = require('jsonwebtoken');

const verifyToken = (req) => {
    return new Promise((resolve, reject) => {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return reject('No token provided.');
        }

        const token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.SECRET,(err, decoded) => {
            if (err) {
                return reject('Failed to authenticate token');
            }

            resolve(decoded);
        });
    });
}

module.exports = { verifyToken };