const Router = require('express');
const jwtMiddleware = require('../middlewares/jwt.middleware.js');
const router = Router();
const {
    createPost,
    getAllPosts,
    addLike,
    getPost,
    deletePost,
    addComment,
} = require('../controllers/post.controller.js');

router.route('/add').post(jwtMiddleware, createPost);
router.route('/get').get(jwtMiddleware, getPost);
router.route('/all').get(getAllPosts);
router.route('/like').put(addLike);
router.route('/delete').delete(deletePost);
router.route('/comment/add').post(jwtMiddleware, addComment);

module.exports = router;
