const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const jwtMiddleware = async (req, res, next) => {
    // * Extracting token from header
    const token = req.headers['authorization']?.split(' ')[1];

    // * Check if token exists or not
    if (!token) {
        return res.status(401).json({
            message: 'Authentication token is missing.',
        });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.body.user_id = decoded.user_id;
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Authentication token is invalid.',
        });
    }
};

module.exports = jwtMiddleware;

// const { username } = await User.findById(decoded.user_id);
// console.log(`User created : ${username}`);
