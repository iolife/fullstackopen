import { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm.js'
import BlogForm from './components/AddBlog'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const blogFormRef = useRef()
  const [errorMessage, setErrorMessage] = useState(null)

  const logout = () => window.localStorage.removeItem('loggedBlogappUser')
  const handleLogin = async (newUser) => {
    try {
      const user = await loginService.login(newUser)
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      setUser(user)
      blogService.setToken(user.token)
    } catch (exception) {
      setErrorMessage(exception.response.data.error)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }
  const createBlog = async (newBlog) => {
    blogFormRef.current.toggleVisibility()
    try {
      const response = await blogService.addBlog(newBlog)
      console.log(response)
      setErrorMessage('add successful ' + response.author)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage(exception.response.data.error)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }

  }
  const updateBlog = async (id, blog) => {
    console.log(id, blog)
    try {
      const response = await blogService.updateBlog(id, blog)
      console.log(response)
      setErrorMessage('add successful ' + response.author)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage(exception.response.data.error)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }
  const deleteBlog = async (id) => {
    console.log(id)
    window.confirm(id)
    try {
      const response = await blogService.deleteBlog(id)
      console.log(response)
      setErrorMessage('add successful ' + response.author)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage(exception.response.data.error)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    blogService.getAll().then(blogs => {
      blogs.sort((a, b) => {
        return b.likes - a.likes

      })
      setBlogs(blogs)
    }
    )
  }, [])

  if (user === null) {
    return (<>
      <Notification message={errorMessage} />
      <Togglable buttonLable="log in">
        <LoginForm
          handleLogin={handleLogin} />
      </Togglable>

    </>)
  } else {
    return (
      <div>
        <h1>blogs</h1>
        <p>{user.username} logined in <button onClick={logout}>logout</button></p>
        <Togglable buttonLable="new note" ref={blogFormRef}>
          <BlogForm
            createBlog={createBlog} />
        </Togglable>

        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} updateBlog={updateBlog} deleteBlog={deleteBlog} />
        )}
      </div>
    )

  }
}
export default App
