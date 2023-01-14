const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {

  const blogs = await Blog
    .find( { } )
    .populate('user')

  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {

  try {
    const foundBlog = await Blog.findById(request.params.id)
    if (foundBlog) {
      response.json(foundBlog)
    } else {
      response.status(404).end()
    }
    
  } catch(exception) {
    next(exception)
  }
})

blogsRouter.post('/', async (request, response, next) => {

  if (!request.user) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById(request.user)

  const blog = new Blog( { 
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes,
    user: user._id
   } )

  try {
    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)

    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
  } catch(exception) {
    next(exception)
  }

})

blogsRouter.put('/:id', async (request, response, next) => {

  if (!request.user) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById(request.user)

  const blogUpdates = {
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes,
  }

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blogUpdates, {new: true})
    response.status(201).json(updatedBlog)
  } catch(exception) {
    next(exception)
  }
})

blogsRouter.delete('/:id', async (request, response, next) => {

  if (!request.user) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  try {
    const blog = await Blog.findById(request.params.id)

    if ( blog.user.toString() === request.user ) {
        await Blog.findByIdAndRemove(request.params.id)
        response.status(204).end()
      } else {
        return response.status(401).json({ error: 'not a blog by current user' })
      }
  } catch(exception) {
    next(exception)
  }

})

module.exports = blogsRouter