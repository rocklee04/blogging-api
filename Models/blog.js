const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    username: {type:String, required: true},
    title: {type:String, required: true},
    content: {type:String, required: true},
    category:{type:String, enum: ['Business', 'Tech', 'Lifestyle', 'Entertainment'], required: true},
    author:{type:mongoose.Schema.ObjectId, ref: 'User', required: true},
    date: {type:Date, default: Date.now},
    likes: {type: Number, default: 0},
    comments: [
        {
            username: {type: String, required: true},
            content: {type: String, required: true},
        },
    ],
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;