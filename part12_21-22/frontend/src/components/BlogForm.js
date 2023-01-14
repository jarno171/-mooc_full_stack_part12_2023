import { useState } from 'react'

const BlogForm = ({
  handleAddNewBlog,
  handleCancelAddNewBlog
}) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')


  const addBlog = async (event) => {
    event.preventDefault()

    await handleAddNewBlog(newTitle, newAuthor, newUrl)

    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  const cancelAdd = () => {
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')

    handleCancelAddNewBlog()
  }

  return (
    <form onSubmit={addBlog}>
      <div>
        title:
        <input
          type="text"
          id="title"
          value={newTitle}
          onChange={(event) => setNewTitle(event.target.value)}
          name="title"
        />
      </div>
      <div>
        author:
        <input
          type="text"
          id="author"
          value={newAuthor}
          onChange={(event) => setNewAuthor(event.target.value)}
          name="author"
        />
      </div>
      <div>
        url:
        <input
          type="text"
          id="url"
          value={newUrl}
          onChange={(event) => setNewUrl(event.target.value)}
          name="url"
        />
      </div>
      <button type="submit" id="add-button">add</button>
      <button type="reset" id="cancel-button" onClick={cancelAdd}>cancel</button>
    </form>
  )
}

export default BlogForm