import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Blog = forwardRef(({ blog, handleAddLike, handleDeleteBlog }, refs) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [visible, setVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(refs, () => {
    return  {
      blog: blog,
      likes: likes,
      setLikes: setLikes,
    }
  })

  return (
    <>
      <div className="blog" style={blogStyle}>
        <div>
          <p>{blog.title}</p>
          <button style={hideWhenVisible} onClick={toggleVisibility}>view</button>
          <button style={showWhenVisible} onClick={toggleVisibility}>close</button>
        </div>

        <div style={showWhenVisible} >
          <p>{blog.url}</p>
          <p>likes {likes} <button id="like-button" onClick={handleAddLike}>like</button></p>
          <p>{blog.author}</p>
          <button id="delete-button" style={showWhenVisible} onClick={handleDeleteBlog}>delete</button>
        </div>
      </div>
    </>
  )
})

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
}

// set display name
Blog.displayName = 'Blog'

export default Blog