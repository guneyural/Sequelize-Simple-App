const {
    getPosts,
    addPost,
    addComment,
    getPostById,
    updatePostById,
    deletePostById
} = require('../controllers/index');
const router = require('express').Router();

router.get('/', getPosts);
router.get('/:id', getPostById);
router.post('/', addPost);
router.post('/comment', addComment);
router.put('/:id', updatePostById);
router.delete('/:id', deletePostById);

module.exports = router;