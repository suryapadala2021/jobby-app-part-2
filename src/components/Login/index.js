import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', responseStatus: 'initial', msg: ''}

  setUsername = event => {
    this.setState({username: event.target.value})
  }

  setPassword = event => {
    this.setState({password: event.target.value})
  }

  onSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
  }

  onLogin = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {
      username,
      password,
    }
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      this.setState({responseStatus: true})
      this.onSuccess(data.jwt_token)
    } else {
      this.setState({responseStatus: false, msg: data.error_msg})
    }
  }

  getUserInput = () => {
    const {username} = this.state
    return (
      <div className="input-container">
        <label className="label" htmlFor="userName">
          USERNAME
        </label>
        <br />
        <input
          onChange={this.setUsername}
          value={username}
          placeholder="username"
          id="userName"
          type="text"
          className="input-box"
        />
      </div>
    )
  }

  getPassInput = () => {
    const {password} = this.state
    return (
      <div className="input-container">
        <label className="label" htmlFor="passWord">
          PASSWORD
        </label>
        <br />
        <input
          onChange={this.setPassword}
          value={password}
          placeholder="password"
          id="passWord"
          type="password"
          className="input-box"
        />
      </div>
    )
  }

  render() {
    const {msg, responseStatus} = this.state
    return (
      <div className="login-container">
        <div className="form-container">
          <div className="logo-box">
            <img
              className="website-logo"
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
            />
          </div>
          <form onSubmit={this.onLogin}>
            {this.getUserInput()}
            {this.getPassInput()}
            <button type="submit" className="login-btn">
              Login
            </button>
            {responseStatus === false && <p className="error-msg">*{msg}</p>}
          </form>
        </div>
      </div>
    )
  }
}
export default Login
