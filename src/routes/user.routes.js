const Router = require('express');
const { addUser, getAllUser } = require('../controllers/user.controller.js');

const router = Router();

// * ROUTES

router.route('/add').post(addUser); // Add User
router.route('/all').get(getAllUser); // Send all Users

module.exports = router;
