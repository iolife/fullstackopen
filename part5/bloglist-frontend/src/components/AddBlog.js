import { useState } from 'react'

const BlogForm = (
  { createBlog }
) => {
  const addBlog = async (event) => {
    event.preventDefault()
    createBlog({ title, author, url })
  }
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const handleTitleChange = ({ target }) => setTitle(target.value)
  const hanleAuthorChange = ({ target }) => setAuthor(target.value)
  const handleUrlChange = ({ target }) => setUrl(target.value)
  return (<>
    <h2>create new blog</h2>
    <form onSubmit={addBlog}>
      <div>
        title
        <input
          type="text"
          name="Title"
          value={title}
          onChange={handleTitleChange}></input>
      </div>

      <div>
        author
        <input
          type="text"
          name="Author"
          value={author}
          onChange={hanleAuthorChange}></input>
      </div>

      <div>
        url
        <input
          type="text"
          name="url"
          value={url}
          onChange={handleUrlChange}></input>
      </div>
      <button type='submit'>create</button>
    </form>
  </>

  )
}
export default BlogForm