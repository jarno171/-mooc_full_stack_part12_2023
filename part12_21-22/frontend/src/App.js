import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [updateMessage, setUpdateMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [blogFormVisible, setBlogFormVisible] = useState(false)
  const [blogsSorted, setBlogsSorted] = useState(false)

  const blogRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( sortBlogsInPlace(blogs) )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      setUser(user)
    }
  }, [])

  const sortBlogsInPlace = (blogsToSort) => {
    blogsToSort.sort((a, b) => {
      return a.likes > b.likes
        ? -1
        : a.likes < b.likes
          ? 1
          : 0
    })

    return blogsToSort
  }

  if (!blogsSorted) {
    const sortedBlogs = sortBlogsInPlace([...blogs])

    setBlogs(sortedBlogs)
    setBlogsSorted(true)
  }

  const showMessage = (setStateFunction, message) => {
    const timeout = 5000

    setStateFunction(message)
    setTimeout(() => {
      setStateFunction('')
    }, timeout)
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')

    } catch (exception) {
      showMessage(setErrorMessage, ('Wrong credentials'))
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const handleAddNewBlog = async (title, author, url) => {

    const newBlog = {
      title: title,
      author: author,
      url: url
    }

    const newReturnedBlog = await blogService.create(newBlog, user)

    setBlogs(blogs.concat(newReturnedBlog))

    showMessage(setUpdateMessage, ('Added new blog'))

    /* Reset form manually, in previous exercises all the inputs in the form were controlled by state */
    setBlogFormVisible(false)
  }

  const handleAddLike = async () => {
    const updatedBlog = { ...blogRef.current.blog, likes: blogRef.current.likes + 1 }

    await blogService.update(updatedBlog)

    const findBlog = blogs.find(blog => blog.id === updatedBlog.id)
    findBlog.likes += 1

    blogRef.current.setLikes(blogRef.current.likes + 1)
    setBlogsSorted(false)
  }

  const handleDeleteBlog = async () => {
    if (window.confirm(`Remove ${blogRef.current.blog.title}?`)) {
      await blogService.remove(blogRef.current.blog)

      setBlogs(blogs.filter(blog => blog.id !== blogRef.current.blog.id))
    }
  }

  const blogList = () => {

    return (
      <div>
        <h2>blogs</h2>
        <p>{user.name} logged in
          <button onClick={handleLogout} >logout</button>
        </p>

        {blogs
          .map(blog =>
            <Blog key={blog.id} blog={blog} handleAddLike={handleAddLike} handleDeleteBlog={handleDeleteBlog} ref={blogRef} />
          )}
      </div>
    )
  }

  const loginForm = () => {

    return (
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        errorMessage={errorMessage}
        handleSubmit={handleLogin}
      />
    )
  }

  const addNewBlog = () => {
    const hideWhenVisible = { display: blogFormVisible ? 'none' : '' }
    const showWhenVisible = { display: blogFormVisible ? '' : 'none' }


    return (
      <div>
        < Notification message={updateMessage} />

        <div style={hideWhenVisible}>
          <button onClick={() => setBlogFormVisible(true)}>add a new blog</button>
        </div>

        <div style={showWhenVisible}>
          < BlogForm
            handleAddNewBlog={handleAddNewBlog}
            handleCancelAddNewBlog={() => setBlogFormVisible(false)}
          />
        </div>
      </div>
    )
  }

  const loggedUserView = () => {
    return (
      <div>
        {blogList()}
        {addNewBlog()}
      </div>
    )
  }

  return (
    <div>
      {
        user === null ?
          loginForm() :
          loggedUserView()
      }
    </div>
  )
}

export default App
