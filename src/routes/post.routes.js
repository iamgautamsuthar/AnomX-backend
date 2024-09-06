const Router = require('express');
const jwtMiddleware = require('../middlewares/jwt.middleware.js');
const router = Router();
const {
    createPost,
    getAllPosts,
    addLike,
} = require('../controllers/post.controller.js');

router.route('/add').post(jwtMiddleware, createPost);
router.route('/all').get(getAllPosts);
router.route('/like').post(addLike);

module.exports = router;
