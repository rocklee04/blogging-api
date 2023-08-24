const express = require('express');
const blogController = require('../Controllers/blogController')
const router = express.Router();

router.post('/blogs', blogController.addBlog);
router.get('/blogs', blogController.getAllBlog);
router.put('/blogs/:id', blogController.updateBlog);
router.delete('/blogs/:id', blogController.deleteBlog);
router.put('/blogs/:id/like', blogController.likeABlog);
router.put('/blogs/:id/comment', blogController.commentABlog);

module.exports = router;