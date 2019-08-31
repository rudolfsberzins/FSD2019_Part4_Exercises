const listHelper = require('../utils/list_helper')

const blogs = [{
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0
  }
]

const listWithOneBlog = [{
  _id: '5a422aa71b54a676234d17f8',
  title: 'Go To Statement Considered Harmful',
  author: 'Edsger W. Dijkstra',
  url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
  likes: 5,
  __v: 0
}]

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})


describe('total likes', () => {
  test('of empty list is zero', () => {
    expect(listHelper.totalLikes([])).toBe(0)
  })

  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test('of a bigger list is calculated right', () => {
    expect(listHelper.totalLikes(blogs)).toBe(36)
  })
})

describe('favorite blog', () => {
  test('of empty list is zero', () => {
    expect(listHelper.favoriteBlog([])).toBe(0)
  })

  test('of list with one blog will be object with that blogs title, author and like count', () => {
    expect(listHelper.favoriteBlog(listWithOneBlog)).toEqual({
      'title': 'Go To Statement Considered Harmful',
      'author': 'Edsger W. Dijkstra',
      'likes': 5
    })
  })

  test('of list with many blogs will return the blog object with most likes', () => {
    expect(listHelper.favoriteBlog(blogs)).toEqual({
      'title': 'Canonical string reduction',
      'author': 'Edsger W. Dijkstra',
      'likes': 12
    })
  })
})

describe('most blogs', () => {
  test('of empty list is zero', () => {
    expect(listHelper.mostBlogs([])).toBe(0)
  })

  test('of list with one blog will be object with that blogs author and blog count', () => {
    expect(listHelper.mostBlogs(listWithOneBlog)).toEqual({
      'author': 'Edsger W. Dijkstra',
      'blogs': 1
    })
  })

  test('of list with many blogs will return object author with most blogs and blog count', () => {
    expect(listHelper.mostBlogs(blogs)).toEqual({
      'author': 'Robert C. Martin',
      'blogs': 3
    })
  })
})

describe('most likes', () => {
  test('of empty list is zero', () => {
    expect(listHelper.mostLikes([])).toBe(0)
  })

  test('of list with one blog will be object with that blogs author and sum of like count', () => {
    expect(listHelper.mostLikes(listWithOneBlog)).toEqual({
      'author': 'Edsger W. Dijkstra',
      'likes': 5
    })
  })

  test('of list with many blogs will return the with most liked blog author and like sum', () => {
    expect(listHelper.mostLikes(blogs)).toEqual({
      'author': 'Edsger W. Dijkstra',
      'likes': 17
    })
  })
})