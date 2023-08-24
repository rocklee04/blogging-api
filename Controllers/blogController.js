const User = require('../Models/User');
const Blog = require('../Models/blog');

//create a blog
async function addBlog(req, res) {
    try{
        const user = await User.findById(req.userId);
        const newBlog = new Blog({
            username: user.username,
            title: req.body.title,
            content: req.body.content,
            category: req.body.category,
            author: user._id,
        })
        await newBlog.save();
        res.status(201).json({message: 'Blog added successfully'});
    } catch(error) {
        res.status(500).json({error: 'An error occurred'});
    }
}



//get all blogs
async function getAllBlog(req, res) {
    try {
        const sort = req.query.sortBy || 'date';
        const sortOrder = req.query.sortOrder || 'asc';
        const filter = {};

        if(req.query.category) {
            filter.category = req.query.category;
        }
        if(req.query.search) {
            const search = new RegExp(req.query.search, 'i');

            filter.$or = [
                {title: search}
            ]
        }

        const blogs = await Blog.find(filter).sort({[sort]: sortOrder});
        res.status(201).json(blogs);
    }
    catch(err) {
        res.status(400).json({message: 'An error occurred', err});
    }
}


//update a blog
async function updateBlog(req, res) {
    try{
        const blog = await Blog.findByIdAndUpdate(
            {_id: req.params.id, username: req.userId},
            {$set: req.body},
            {new: true}
        );
        if(!blog) {
            return res.status(404).json({error: 'Blog not found'});
        }
        res.status(200).json({message: 'Blog has updated successfully', blog});
    }
    catch(err) {
        res.status(400).json({message: 'An error occurred'});
    }
}

//delete a blog
async function deleteBlog(req, res) {
    try{
        const blog = await Blog.findByIdAndDelete({_id: req.params.id, username: req.userId});
        if(!blog) {
            return res.status(404).json({error: 'Blog not found'});
        }
        res.status(200).json({message: 'Blog has deleted successfully'});
    }
    catch(err) {
        res.status(400).json({message: 'An error occurred'});
    }
}


//like a blog
async function likeABlog(req, res) {
    try{
        const blog = await Blog.findByIdAndUpdate(
            {_id: req.params.id},
            {$inc: {likes: 1}},
            {new: true}
        );
        if(!blog) {
            return res.status(404).json({error: 'Blog not found'});
        }
        res.status(200).json({message: 'Blog has liked successfully', blog});
    }
    catch(err) {
        res.status(400).json({message: 'An error occurred'});
    }  
}


//comment on a blog
async function commentABlog(req, res) {
    try{
        const user = await User.findById(req.userId);
        const blog = await Blog.findByIdAndUpdate(
            {_id: req.params.id},
            {
                $push:{
                    comments: {
                        username: user.username,
                        content: req.body.content,
                    }
                }
            },
            {new: true}
        );
        if(!blog) {
            return res.status(404).json({error: 'Blog not found'});
        }
        res.status(200).json({message: 'Blog has been commented successfully', blog});
    }
    catch(err) {
        res.status(400).json({message: 'An error occurred'});
    }  
}


module.exports ={
    addBlog,
    getAllBlog,
    updateBlog,
    deleteBlog,
    likeABlog,
    commentABlog,
}