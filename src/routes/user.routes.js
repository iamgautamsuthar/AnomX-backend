const Router = require('express');
const { addUser, getAllUser } = require('../controllers/user.controller.js');

const router = Router();

router.route('/add').post(addUser);
router.route('/all').get(getAllUser);

module.exports = router;
