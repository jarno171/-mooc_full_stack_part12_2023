const _ = require('lodash');

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {

  return blogs.length === 0
    ? 0
    : blogs.reduce((cumulativeSum, blog) => cumulativeSum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {

  return blogs.length === 0
    ? { }
    : blogs.reduce((prev, current) => prev.likes > current.likes ? prev : current)
}

const mostBlogs = (blogs) => {

  if (blogs.length === 0) {
    return { }
  } else {
    const groupedBlogs = _.groupBy(blogs, blogs => blogs.author)
    const groupedBlogsLengths = _.mapValues(groupedBlogs, (values) => values.length)

    const mostBlogsResult = _.reduce(groupedBlogsLengths, (result, value, key) => {
      return result > value || (result === undefined)
            ? result
            : key
    }, { })

    return {
      author: mostBlogsResult,
      blogs: groupedBlogsLengths[mostBlogsResult]
    }
  }
}

const mostLikes = (blogs) => {

  if (blogs.length === 0) {
    return { }
  } else {
    const groupedBlogs = _.groupBy(blogs, blogs => blogs.author)

    const groupedBlogsLengths =
      _.mapValues(groupedBlogs,
        (values) => values.reduce((cumulativeLikes, current) => {
          return cumulativeLikes + current.likes
        }, 0)
      )

    const mostLikesResult = _.reduce(groupedBlogsLengths, (result, value, key) => {
      return result > value || (result === undefined)
            ? result
            : key
    }, { })

    return {
      author: mostLikesResult,
      likes: groupedBlogsLengths[mostLikesResult]
    }
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}