const Post = require('../models/post.model.js');

// * Create a Post
const createPost = async (req, res) => {
    const { user_id, content } = req.body;
    if (!user_id || !content) {
        res.status(400).json({ message: 'Content required' });
    }
    try {
        const post = new Post({ user_id, content });
        await post.save();
        res.status(200).json({
            message: 'Post created successfully',
            data: post,
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// * Get All Posts

const getAllPosts = async (req, res) => {
    try {
        const posts = Post.find()
            .populate('user_id', 'name username photo_url')
            .exec();
        res.status(200).json({
            message: 'successful',
            posts,
        });
    } catch (error) {
        res.status(400).json({
            error: error.message,
        });
    }
};

module.exports = { createPost, getAllPosts };
