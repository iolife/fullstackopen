import { useState } from 'react'

const Blog = ({ blog, updateBlog, deleteBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const [visible, setVisible] = useState(false)
  const showWhenVisible = { display: visible ? '' : 'none' }
  const showTextWhenVisible = visible ? 'hide' : 'view'

  return (
    <div style={blogStyle}>
      {blog.title} <button
        onClick={() => setVisible(!visible)} >
        {showTextWhenVisible}
      </button>
      <button
        onClick={() => deleteBlog(blog.id)}>
        delete
      </button>
      <div style={showWhenVisible}>
        <div>{blog.author}</div>
        <div>likes: {blog.likes}
          <button onClick={() => updateBlog(blog.id, {
            user: blog.user.id,
            likes: blog.likes++,
            author: blog.author,
            title: blog.title,
            url: blog.url
          })}>like</button>
        </div>
        <div>{blog.url}</div>
      </div>
    </div>
  )
}


export default Blog