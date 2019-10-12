const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [{
    title: 'Test Blog 1',
    url: 'https://www.example.com/',
    author: 'Rudolfs Berzins'
  },
  {
    title: 'Test Blog 2',
    url: 'https://www.example.com/',
    author: 'Rudolfs Berzins'
  },
]

const nonExistingId = async () => {
  const blog = new Blog({
    title: 'willremovethissoon',
    author: 'willremovethisalso'
  })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
  usersInDb
}