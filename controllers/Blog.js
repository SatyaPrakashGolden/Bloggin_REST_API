const Blog = require('../models/Blog.js');
const mongoose = require('mongoose');
const getAllBlogs = async (req, res) => {
  try {
    let blogs = await Blog.find();
    res.status(200).json(blogs); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
const getBlogById = async (req, res) => {
    try {
      const postId = req.params.id;
  
      // Check if postId is a valid ObjectId
      if (!postId || !mongoose.isValidObjectId(postId)) {
        return res.status(400).json({ error: 'Invalid post ID' });
      }
  
      // Find the blog post by ID
      const blog = await Blog.findById(postId);
  
      // Check if the blog post was found
      if (!blog) {
        return res.status(404).json({ error: 'Blog post not found' });
      }
  
      res.status(200).json(blog);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  const createPost = async (req, res) => {
    try {
      const { title, description, image } = req.body;
      const userId = req.user.id;
      // Check if required fields are provided
      if (!title || !description) {
        return res.status(400).json({ error: 'Title and description are required' });
      }
  
      // Create a new blog post
      const newBlog = await Blog.create({
        title,
        description,
        image,
        user: userId,
      });
      res.status(201).json({ message: 'Blog post created successfully', newBlog });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  const updatePost = async (req, res) => {
    try {
      const postId = req.params.id;
      const { title, description } = req.body; // Remove 'image' from the fields
  
      // Check if postId is a valid ObjectId
      if (!postId || !mongoose.isValidObjectId(postId)) {
        return res.status(400).json({ error: 'Invalid post ID' });
      }
  
      // Create an object to store the updated fields (excluding 'image')
      const updatedFields = {};
      if (title) updatedFields.title = title;
      if (description) updatedFields.description = description;
  
      // Find the blog post by ID and update it (excluding 'image')
      const updatedBlog = await Blog.findByIdAndUpdate(
        postId,
        updatedFields,
        { new: true }
      );
  
      // Check if the blog post was found and updated
      if (!updatedBlog) {
        return res.status(404).json({ error: 'Blog post not found' });
      }
  
      res.status(200).json({ message: 'Blog post updated successfully', updatedBlog });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  const deletePost = async (req, res) => {
    try {
      const postId = req.params.id; 
      if (!postId) {
        return res.status(400).json({ error: 'Invalid post ID' });
      }
      const deletedBlog = await Blog.findByIdAndRemove(postId);
      if (!deletedBlog) {
        return res.status(404).json({ error: 'Blog post not found' });
      }
      res.status(200).json({ message: 'Blog post deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
module.exports = { getAllBlogs ,createPost,deletePost,updatePost,getBlogById };
