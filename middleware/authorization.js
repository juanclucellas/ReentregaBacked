const jwt = require('jsonwebtoken');

function authorization(role) {
    return (req, res, next) => {
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        jwt.verify(token, 'your_jwt_secret', (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: 'Invalid token' });
            }
            if (decoded.role !== role) {
                return res.status(403).json({ message: 'Forbidden' });
            }
            next();
        });
    };
}
module.exports = authorization;