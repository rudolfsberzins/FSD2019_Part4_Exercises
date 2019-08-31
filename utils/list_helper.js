const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const reducer = (sum, item) => {
  return sum + item.likes
}

const totalLikes = array => {
  return array.length === 0 ?
    0 :
    array.reduce(reducer, 0)
}

const favoriteBlog = array => {
  if (array.length === 0) {
    return 0
  }

  const allLikes = array.map(item => item.likes)
  const favorite = array[allLikes.indexOf(Math.max(...allLikes))]

  return {
    'title': favorite.title,
    'author': favorite.author,
    'likes': favorite.likes
  }
}

const mostBlogs = array => {
  if (array.length === 0) {
    return 0
  }

  const blogCount = _.countBy(array, (entry) => entry.author)
  const bestAuthor = _.max(Object.keys(blogCount), o => blogCount[o])
  return {
    'author': bestAuthor,
    'blogs': blogCount[bestAuthor]
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}