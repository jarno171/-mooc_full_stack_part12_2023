import ErrorBar from './Errorbar'

const LoginForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  errorMessage,
  username,
  password
}) => {
  return (
    <div>
      <h2>Login</h2>

      < ErrorBar message={errorMessage} />

      <form onSubmit={handleSubmit}>
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
        <button type="submit">login</button>
      </form>

    </div>
  )
}

export default LoginForm