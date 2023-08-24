const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    username: {type:mongoose.Schema.ObjectId, ref: 'User', required: true},
    title: {type:String, required: true},
    content: {type:String, required: true},
    category:{type:String, enum: ['Business', 'Tech', 'Lifestyle', 'Entertainment'], required: true},
    date: {type:Date, default: Date.now},
    likes: [{type: mongoose.Schema.ObjectId, ref: 'User'}],
    comments: [
        {
            username: {type: mongoose.Schema.ObjectId, ref: 'User'},
            content: {type: String, required: true},
        },
    ],
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;