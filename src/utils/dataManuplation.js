const modifyPost = (posts) => {
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
                const modifiedComment = { ...comment.toObject() };

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

    return modifiedPosts;
};

module.exports = modifyPost;
