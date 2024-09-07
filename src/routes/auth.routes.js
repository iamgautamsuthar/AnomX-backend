const Router = require('express');
const { login, register } = require('../controllers/auth.controller.js');

const router = Router();

// * ROUTES

router.route('/login').post(login); // Login
router.route('/register').post(register); // Register

module.exports = router;
