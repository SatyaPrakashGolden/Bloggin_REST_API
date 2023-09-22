const express = require('express');
const Blogrouter = express.Router();
const { getAllBlogs, createPost, deletePost, updatePost, getBlogById } = require('../controllers/Blog.js');
Blogrouter.get('/getAllBlogs', getAllBlogs);
Blogrouter.get('/getBlog/:id', getBlogById);  
Blogrouter.post('/createPost', createPost);  //->
Blogrouter.delete('/delete/:id', deletePost);
Blogrouter.put('/update/:id', updatePost);
module.exports = Blogrouter;
