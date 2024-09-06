const Router = require('express');
const jwtMiddleware = require('../middlewares/jwt.middleware.js');
const router = Router();
const {
    createPost,
    getAllPosts,
} = require('../controllers/post.controller.js');

router.route('/add').post(jwtMiddleware, createPost);
router.route('/all').get(getAllPosts);

module.exports = router;
