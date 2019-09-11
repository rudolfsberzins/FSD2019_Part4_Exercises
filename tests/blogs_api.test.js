const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObject = helper.initialBlogs.map(blog => new Blog(blog))
  const promiseArray = blogObject.map(blog => blog.save())
  await Promise.all(promiseArray)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body.length).toBe(helper.initialBlogs.length)
})

test('blogs entry has "id" property', async () => {
  const allBlogs = await helper.blogsInDb()
  expect(allBlogs[0].id).toBeDefined()
})

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'Addable blog',
    url: 'https://www.bloglist.com'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)

  const titles = blogsAtEnd.map(b => b.title)
  expect(titles).toContain('Addable blog')

})

test('an added blog entry with no likes will default to 0 likes', async () => {
  const newBlog = {
    title: 'Addable blog',
    url: 'https://www.bloglist.com'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)

  const blogsAtEnd = await helper.blogsInDb()

  const lastBlog = blogsAtEnd[helper.initialBlogs.length]

  expect(lastBlog.likes).toBe(0)
})

test('blog without title and url is not added and rejected', async () => {
  const newBlog = {
    likes: 12
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd.length).toBe(helper.initialBlogs.length)
})

test('succeeds with status code 204 if id is valid', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd.length).toBe(
    helper.initialBlogs.length - 1
  )

  const titles = blogsAtEnd.map(r => r.title)

  expect(titles).not.toContain(blogToDelete.title)

})

afterAll(() => {
  mongoose.connection.close()
})