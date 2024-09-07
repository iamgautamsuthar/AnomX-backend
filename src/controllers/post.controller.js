const logger = require('../logger.js');
const Post = require('../models/post.model.js');
const User = require('../models/user.model.js');

// * Create a Post
const createPost = async (req, res) => {
    const { user_id, content } = req.body;

    // * Check user_id and content
    if (!user_id || !content) {
        return res.status(400).json({ message: 'Content required' });
    }
    try {
        const isUserExist = await User.findById(user_id);
        if (!isUserExist) {
            return res.status(500).json({
                message: 'An error occurred while creating a post',
            });
        }

        const post = new Post({ user_id, content });
        await post.save();
        res.status(200).json({
            message: 'Post created successfully',
            data: post,
        });
    } catch (error) {
        res.status(500).json({
            message: 'An error occurred while creating a post',
            error: error.message,
        });
    }
};

// * Get All Posts
const getAllPosts = async (req, res) => {
    const { post_id, limit = 10 } = req.query;
    try {
        const pageLimit = parseInt(limit, 10);
        let query;
        if (post_id) {
            const referencePost = await Post.findById(post_id);
            const { createdAt } = referencePost;
            query = { createdAt: { $lt: createdAt } };
        } else {
            query = {};
        }
        const posts = await Post.find(query)
            .populate('user_id', 'name username photo_url')
            .populate({
                path: 'comments.user_id',
                select: 'name username photo_url',
            })
            .sort({ createdAt: -1 })
            .limit(pageLimit)
            .exec();

        const modifiedPosts = posts.map((post) => {
            const modifiedPost = post.toObject();
            if (modifiedPost.user_id) {
                modifiedPost.author = modifiedPost.user_id;
                delete modifiedPost.user_id;
                if (modifiedPost.author._id) {
                    modifiedPost.author.user_id = modifiedPost.author._id;
                    delete modifiedPost.author._id;
                }
            }

            // Process comments
            if (modifiedPost.comments) {
                modifiedPost.comments = modifiedPost.comments.map((comment) => {
                    const modifiedComment = { ...comment };

                    if (modifiedComment.user_id) {
                        modifiedComment.author = modifiedComment.user_id;
                        delete modifiedComment.user_id;

                        // Rename `_id` to `user_id` inside `author`
                        if (modifiedComment.author) {
                            modifiedComment.author.user_id =
                                modifiedComment.author._id;
                            delete modifiedComment.author._id;
                        }
                    }

                    return modifiedComment;
                });
            }

            return modifiedPost;
        });

        res.status(200).json({
            message: 'successful',
            data: modifiedPosts,
        });
    } catch (error) {
        res.status(400).json({
            error: error.message,
        });
    }
};

// * Get Post
const getPost = async (req, res) => {
    const { user_id } = req.body;
    const { post_id, limit = 10 } = req.query;
    try {
        const pageLimit = parseInt(limit, 10);
        let query;
        if (post_id) {
            const referencePost = await Post.findById(post_id);
            const { createdAt } = referencePost;
            query = { user_id: user_id, createdAt: { $lt: createdAt } };
        } else {
            query = { user_id: user_id };
        }
        const posts = await Post.find(query)
            .populate('user_id', 'name username photo_url')
            .populate({
                path: 'comments.user_id',
                select: 'name username photo_url',
            })
            .sort({ createdAt: -1 })
            .limit(pageLimit)
            .exec();

        const modifiedPosts = posts.map((post) => {
            const modifiedPost = post.toObject();
            if (modifiedPost.user_id) {
                modifiedPost.author = modifiedPost.user_id;
                delete modifiedPost.user_id;
                if (modifiedPost.author._id) {
                    modifiedPost.author.user_id = modifiedPost.author._id;
                    delete modifiedPost.author._id;
                }
            }

            // Process comments
            if (modifiedPost.comments) {
                modifiedPost.comments = modifiedPost.comments.map((comment) => {
                    const modifiedComment = { ...comment };

                    if (modifiedComment.user_id) {
                        modifiedComment.author = modifiedComment.user_id;
                        delete modifiedComment.user_id;

                        // Rename `_id` to `user_id` inside `author`
                        if (modifiedComment.author) {
                            modifiedComment.author.user_id =
                                modifiedComment.author._id;
                            delete modifiedComment.author._id;
                        }
                    }

                    return modifiedComment;
                });
            }

            return modifiedPost;
        });

        res.json({
            message: 'Successful',
            data: modifiedPosts,
        });
    } catch (error) {
        res.status(400).json({
            error: error.message,
        });
    }
};

// * Like
const addLike = async (req, res) => {
    const { post_id, like } = req.body;

    const incrementValue = like ? 1 : -1;

    try {
        const updatedPost = await Post.findByIdAndUpdate(
            post_id,
            {
                $inc: { likes_count: incrementValue },
            },
            {
                new: true,
                runValidators: true,
            }
        );
        if (updatedPost.likes_count < 0) {
            updatedPost.likes_count = 0;
            await updatedPost.save();
        }
    } catch (error) {
        res.status(400).json({
            error: error.message,
        });
    }
};

// * Delete Post
const deletePost = async (req, res) => {
    const { post_id } = req.body;
    try {
        const deletedPost = Post.findByIdAndDelete(post_id);

        if (!deletedPost) {
            return res.status(400).json({ message: 'Post not found' });
        }

        res.status(200).json({
            message: 'Post deleted successfully',
            post: deletedPost,
        });
    } catch (error) {
        res.status(400).json({
            error: error.message,
        });
    }
};

// * Add comment
const addComment = async (req, res) => {
    const { user_id, comment, post_id } = req.body;
    if (!user_id || !comment || !post_id) {
        return res.status(400).json({
            message: 'Comment and Post id required',
        });
    }

    try {
        const posts = await Post.findById(post_id)
            .populate('user_id', 'name username photo_url')
            .populate({
                path: 'comments.user_id',
                select: 'name username photo_url',
            })
            .sort({ createdAt: -1 })
            .exec();
        const newComment = {
            user_id,
            comment,
            createdAt: new Date(),
        };

        posts.comments.push(newComment);
        await posts.save();

        // const modifiedPosts = posts.map((post) => {
        //     // Ensure post is an object
        //     const modifiedPost = post.toObject();

        //     // Rename user_id to author and convert _id to user_id within author
        //     if (modifiedPost.user_id) {
        //         modifiedPost.author = {
        //             ...modifiedPost.user_id.toObject(),
        //             user_id: modifiedPost.user_id._id.toString(), // Add user_id
        //         };
        //         delete modifiedPost.user_id;
        //     }

        //     // Process comments
        //     if (modifiedPost.comments) {
        //         modifiedPost.comments = modifiedPost.comments.map((comment) => {
        //             const modifiedComment = {
        //                 ...comment.toObject(),
        //                 author: {
        //                     ...comment.user_id.toObject(),
        //                     user_id: comment.user_id._id.toString(), // Add user_id
        //                 },
        //             };
        //             delete modifiedComment.user_id; // Remove original user_id
        //             return modifiedComment;
        //         });
        //     }

        //     return modifiedPost;
        // });

        res.status(200).json({
            message: 'Comment added successfully',
            data: posts,
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    createPost,
    getAllPosts,
    addLike,
    getPost,
    deletePost,
    addComment,
};
