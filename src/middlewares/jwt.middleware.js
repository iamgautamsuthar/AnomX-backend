const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const jwtMiddleware = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(400).json({ message: 'Token missing or invalid' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user_id = decoded.user_id;
        next();
    } catch (err) {
        return res.status(400).json({ message: 'Token is invalid' });
    }
};

module.exports = jwtMiddleware;
