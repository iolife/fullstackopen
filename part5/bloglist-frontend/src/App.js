import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import Blog from './components/Blog'
import Notification from "./components/Notification"
import LoginForm from "./components/LoginForm.js"
import AddBlog from './components/AddBlog'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [errorMessage, setErrorMessage] = useState(null)

  const logout = () => window.localStorage.removeItem("loggedBlogappUser")
  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        "loggedBlogappUser", JSON.stringify(user)
      )
      setUser(user)
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage(exception.response.data.error)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")
  const addBlog = async (event) => {
    event.preventDefault()
    console.log('add blog in with', title, author, url)
    try {
      const response = await blogService.addBlog({ title, author, url })
      console.log(response)
      setErrorMessage("add successful " + response.author)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      setAuthor("")
      setTitle("")
      setUrl("")
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
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  if (user === null) {
    return (<>
      <Notification message={errorMessage} />
      <LoginForm
        username={username}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        password={password}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin} />
    </>)
  } else {
    return (
      <div>
        <h1>blogs</h1>
        <p>{user.username} logined in <button onClick={logout}>logout</button></p>
        <AddBlog
          handleAddBlog={addBlog}
          title={title} 
          handleTitleChange={({ target }) => setTitle(target.value)}
          author={author} 
          hanleAuthorChange={({ target }) => setAuthor(target.value)}
          url={url} 
          handleUrlChange={({ target }) => setUrl(target.value)} />

        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    )

  }
}
export default App
