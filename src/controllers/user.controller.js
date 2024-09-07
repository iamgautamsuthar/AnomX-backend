const User = require('../models/user.model.js');

// * Add user
const addUser = async (req, res) => {
    const { name, username, password } = req.body;

    // * Check Name, Username, Password
    if (!name || !username || !password) {
        return res.status(400).json({
            message: 'Name, username and password are required',
        });
    }
    try {
        const user = new User({ name, username, password });

        // * Save data
        await user.save();
        res.status(201).json({
            message: 'User added successfully',
            data: user,
        });
    } catch (error) {
        res.status(500).json({
            message: 'An error occurred while adding the user.',
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
            message: 'Data fetched successfully',
            data: users,
        });
    } catch (error) {
        res.status(500).json({
            message: 'An error occurred while fetching user data',
            error: error.message,
        });
    }
};

module.exports = { addUser, getAllUser };
