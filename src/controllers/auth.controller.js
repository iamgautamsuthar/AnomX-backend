const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user.model');
const logger = require('../logger');

const JWT_SECRET = process.env.JWT_SECRET;

// * Login
const login = async (req, res) => {
    const { username, password } = req.body;

    // * Check username and password
    if (!username || !password) {
        return res.status(400).json({
            message: 'Username and password are required for authentication.',
        });
    }

    try {
        const user = await User.findOne({ username });

        // * Check if user exist or not
        if (!user) {
            return res.status(401).json({
                message: 'Invalid username.',
            });
        }

        // * Password Match
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                message: 'Invalid password',
            });
        }

        // * Assign Token
        const token = jwt.sign(
            {
                user_id: user._id,
            },
            JWT_SECRET,
            {
                expiresIn: '10d',
            }
        );

        logger.info(`Login: ${username}`);

        res.status(200).json({
            message: 'Login successful',
            token,
            data: user,
        });
    } catch (error) {
        res.status(500).json({
            message: 'An error occurred while logging in',
            error: error.message,
        });
    }
};

// * Register
const register = async (req, res) => {
    const { username, password, name } = req.body;

    // * Check username, password and name
    if (!username || !password || !name) {
        return res
            .status(400)
            .json({ message: 'Username, password and name are required.' });
    }
    try {
        // * Save data
        const user = new User({ username, name, password });
        await user.save();

        // * Assign Token
        const token = jwt.sign(
            {
                user_id: user._id,
            },
            JWT_SECRET,
            {
                expiresIn: '10d',
            }
        );
        res.status(200).json({
            message: 'Register successful',
            token,
            data: user,
        });
    } catch (error) {
        res.status(500).json({
            message: 'An error occurred while registering',
            error: error.message,
        });
    }
};

module.exports = { login, register };
