const blogsRouter = require('express').Router()
const Blog = require('../models/blog.js')
const mongoose = require('mongoose')

blogsRouter.get('/', async (request, response) => {
    try {
        const blogs = await Blog.find({})
        response.json(blogs)
    } catch (error) {
        response.status(500).json({ error: 'Internal Server Error' })
    }
})
  
blogsRouter.post('/', async (request, response) => {
    try {
        const blog = new Blog(request.body)
        const result = await blog.save()
        response.status(201).json(result)
    } catch (error) {
        response.status(500).json({ error: 'Internal Server Error' })
    }
})

blogsRouter.delete('/:id', async (request, response) => {
    try {

        const id = request.params.id;  // id is a string in the URL
        if (!mongoose.Types.ObjectId.isValid(id)) {
            console.log('Invalid ObjectId');
            return response.status(400).json({ error: 'Invalid blog ID' });
        }

        // Use mongoose.Types.ObjectId(id) to ensure correct format if needed
        const deletedBlog = await Blog.findByIdAndDelete(id);

        if (!deletedBlog) {
            console.log('Blog not found');
            return response.status(404).json({ error: 'Blog not found' });
        }

        response.status(204).end();
    } catch (error) {
        console.error('Error:', error);
        response.status(500).json({ error: error.message });
    }
});

blogsRouter.put('/:id', async (request, response) => {
    try {
        const id = request.params.id;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return response.status(400).json({ error: 'Invalid blog ID' });
        }

        const updatedBlog = await Blog.findByIdAndUpdate(id, { likes: request.body.likes }, { new: true });
        if (!updatedBlog) {
            return response.status(404).json({ error: 'Blog not found' });
        }

        response.json(updatedBlog);
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
});

module.exports = blogsRouter
