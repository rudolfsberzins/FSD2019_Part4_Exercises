require("dotenv").config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const Blog = require('./models/blog')

const requestLogger = (request, response, next) => {
  console.log("Method:", request.method)
  console.log("Path:  ", request.path)
  console.log("Body:  ", request.body)
  console.log("---")
  next()
}

app.use(bodyParser.json())
app.use(requestLogger)
app.use(cors())

app.get('/api/blogs', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs.map(blog => blog.toJSON()))
    })
})

app.post('/api/blogs', (request, response) => {
  const body = request.body

  if (body.title === undefined || body.url === undefined) {
    return response.status(400).json({
      error: "title or url missing"
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

const unknownEndpoint = (request, response) => {
  response.status(404).send({
    error: "unknown endpoint"
  })
}
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === "CastError" && error.kind === "ObjectId") {
    return response.status(400).send({
      error: "malformatted id"
    })
  } else if (error.name === "ValidationError") {
    return response.status(400).json({
      error: error.message
    })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})