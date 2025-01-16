const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const helper = require('./test_helper')

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  await Blog.insertMany(helper.initialBlogs)
})

test('there are the right amount of blogs', async () => {
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, helper.initialBlogs.length)
    })


test('the response body has an "id" parameter', async () => {
    const response = await api.get('/api/blogs')
    assert(response.body[0].hasOwnProperty('id'))
})

test('making a POST request adds a blog', async () => {
    const newBlog = {
        title: 'test title',
        author: 'test author',
        url: 'test url',
        likes: 0
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
})

test('making a DELETE request deletes the blog', async () => {
    const response = await api.get('/api/blogs')
    const id = response.body[0].id

    await api
        .delete(`/api/blogs/${id}`)
        .expect(204)
})

test('making a PUT request updates the blog', async () => {
    const response = await api.get('/api/blogs')
    const id = response.body[0].id

    const updatedBlog = {
        likes: 100
    }
    await api
        .put(`/api/blogs/${id}`)
        .send(updatedBlog)
        .expect(200)

    const newResponse = await api.get('/api/blogs')
    assert.strictEqual(newResponse.body[0].likes, 100)
})

after(async () => {
  await mongoose.connection.close()
})

