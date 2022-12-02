import { useState } from 'react'

const LoginForm = ({
  handleLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const handleUsernameChange = ({ target }) => setUsername(target.value)
  const handlePasswordChange = ({ target }) => setPassword(target.value)
  const handleSubmit = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
    handleLogin({
      username, password
    })
    setPassword('')
    setUsername('')
  }

  return (
    < form onSubmit={handleSubmit}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={handleUsernameChange}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={handlePasswordChange}
        />
      </div>
      <button type='submit'>login</button>
    </form>
  )
}
export default LoginForm