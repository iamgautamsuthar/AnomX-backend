const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const JWT_SECRET = process.env.JWT_SECRET;

// * Login
const login = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res
            .status(400)
            .json({ message: 'Username and password are required.' });
    }
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({
                message: 'Invalid username',
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                message: 'Invalid password',
            });
        }
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
            message: 'Login successful',
            token,
        });
    } catch (error) {
        res.status(400).json({
            message: 'Error logging in',
            error: error.message,
        });
    }
};

// * Register
const register = async (req, res) => {
    const { username, password, name } = req.body;
    if (!username || !password || !name) {
        return res
            .status(400)
            .json({ message: 'Username, password and name are required.' });
    }
    try {
        const user = new User({ username, name, password });
        await user.save();
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
        res.status(400).json({
            error: error.message,
        });
    }
};

module.exports = { login, register };
