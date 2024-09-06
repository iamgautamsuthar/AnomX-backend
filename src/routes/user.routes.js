const Router = require('express');
const router = Router();
const { addUser, getAllUser } = require('../controllers/user.controller.js');

router.route('/users').get(getAllUser).post(addUser);

module.exports = router;
