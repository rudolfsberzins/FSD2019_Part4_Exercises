const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post('/', (request, response) => {
  const body = request.body

  if (body.title === undefined || body.url === undefined) {
    return response.status(400).json({
      error: 'title or url missing'
    })
  }

  const blog = new Blog({
    title: body.title,
    url: body.url,
    author: body.author || undefined,
    likes: body.likes || 0,
  })

  blog
    .save()
    .then(savedBlog => savedBlog.toJSON())
    .then(savedFormatedBlog => {
      response.status(201).json(savedFormatedBlog)
    }).catch(error => next(error))
})

module.exports = blogsRouter