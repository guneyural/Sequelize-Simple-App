const {
    user,
    post,
    comment
} = require('../db/models');

const getPosts = async (req, res) => {
    try {
        const posts = await post.findAll({
            include: [
                {
                    model: user,
                    as: 'owner'
                },
                {
                    model: comment,
                    as: 'comments',
                    seperate: true
                }
            ],
            order: [
                ['createdAt', 'DESC'],
                ["comments", 'createdAt', 'DESC']
            ]
        });
        if(posts.length > 0) return res.json(posts);
        return res.status(404).json({ msg: 'No Post Could Be Found.' });
    } catch (err) {
        res.status(500).json(err.message);
    }
};

const addPost = async (req, res) => {
    try {
        const newPost = await post.create(req.body);
        return res.status(201).json(newPost);
    } catch (err) {
        res.status(500).json(err.message);
    }
};

const addComment = async (req, res) => {
    try {
        const createComment = await comment.create(req.body);
        const newComment = await comment.findOne({
            where: { id:createComment.id },
            include: [
                {
                    model: user,
                    as: 'owner'
                }
            ]
        });
        return res.status(201).json(newComment);
    } catch (err) {
        return res.status(500).json(err.message);
    }
}

const getPostById = async (req, res) => {
    try {
        const getPost = await post.findOne({
            where: { id: req.params.id },
            include: [
                {
                    model: user,
                    as: 'owner'
                },
                {
                    model: comment,
                    as: 'comments'
                }
            ]
        });
        if(getPost) return res.json(getPost);
        return res.status(404).json({ msg: 'Post With That ID does not exists' });
    } catch (err) {
        res.status(500).json(err.message);
    }
};

const updatePostById = async (req, res) => {
    try {
        const updatePost = await post.update(req.body, {
            where: { id: req.params.id },
            returning: true
        });
        const updatedPost = await post.findOne({
            where: { id: req.params.id },
            include: [
                {
                    model: user,
                    as: 'owner'
                }
            ]
        });
        if(updatePost) return res.json(updatedPost);
        return res.json(400).json({ msg: 'Blog Not Found' });
    } catch (err) {
        res.status(500).json(err.message);
    }
};

const deletePostById = async (req, res) => {
    try {
        const deletePost = await post.destroy({
            where: { id: req.params.id }
        });
        res.json({ msg: 'Deleted Successfully.' });
    } catch (err) {
        res.status(500).json(err.message);
    }
};

module.exports = {
    getPosts,
    addPost,
    addComment,
    getPostById,
    updatePostById,
    deletePostById
};