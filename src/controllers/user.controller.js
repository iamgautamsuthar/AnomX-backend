const User = require('../models/user.model.js');

// * Add user
const addUser = async (req, res) => {
    const { name, username, password, photo_url } = req.body;
    try {
        const user = new User({ name, username, password, photo_url });

        // * Validate Data
        for (key in user) {
            if (!user[key]) {
                res.status(400).json({
                    message: `${key} required`,
                });
            }
        }

        // * Save data
        await user.save();
        res.status(200).json({
            message: 'user added successfully',
            data: user,
        });
    } catch (error) {
        res.status(400).json({
            error: error.message,
        });
    }
};

// * Get All User
const getAllUser = async (req, res) => {
    try {
        // * Remove password field
        const users = await User.find().select('-password');
        res.status(200).json({
            message: 'data fetched successfully',
            data: users,
        });
    } catch (error) {
        res.status(400).json({
            error: error.message,
        });
    }
};

module.exports = { addUser, getAllUser };
