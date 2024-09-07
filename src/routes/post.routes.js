const Router = require('express');
const jwtMiddleware = require('../middlewares/jwt.middleware.js');
const {
    createPost,
    getAllPosts,
    addLike,
    getPost,
    deletePost,
    addComment,
} = require('../controllers/post.controller.js');

const router = Router();
// * ROUTES

router.route('/add').post(jwtMiddleware, createPost); // Add post
router.route('/get').get(jwtMiddleware, getPost); // Send posts according to user_id
router.route('/all').get(getAllPosts); // Send all posts
router.route('/like').put(addLike); // Add or remove like to  post
router.route('/delete').delete(deletePost); // Delete post
router.route('/comment').post(jwtMiddleware, addComment); // Add comment to post

module.exports = router;
