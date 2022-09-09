import './index.css'
import {AiFillHome} from 'react-icons/ai'
import {GiSuitcase} from 'react-icons/gi'
import {FiLogOut} from 'react-icons/fi'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

const Header = props => {
  const logout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <div className="jobby-header">
      <Link to="/" id="link">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="header-website-logo"
        />
      </Link>
      <ul className="nav-list-lg">
        <p className="nav-item-lg">
          <Link to="/" id="link">
            Home
          </Link>
        </p>
        <p className="nav-item-lg">
          <Link to="/jobs" id="link">
            Jobs
          </Link>
        </p>
      </ul>
      <button onClick={logout} className="logout-btn" type="button">
        Logout
      </button>
      <nav className="nav-box-sm">
        <ul className="nav-list">
          <li>
            <Link to="/">
              <AiFillHome className="home-icon" />
            </Link>
          </li>
          <li>
            <Link to="/jobs">
              <GiSuitcase className="jobs-icon" />
            </Link>
          </li>
          <li>
            <button type="button" className="logout-icon-btn" onClick={logout}>
              <FiLogOut className="logout-icon" />
            </button>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default withRouter(Header)
