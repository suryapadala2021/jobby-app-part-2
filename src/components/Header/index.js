import './index.css'
import {AiFillHome} from 'react-icons/ai'
import {GiSuitcase} from 'react-icons/gi'
import {FiLogOut} from 'react-icons/fi'

const Header = () => (
  <div className="jobby-header">
    <img
      src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
      alt="website logo"
      className="header-website-logo"
    />
    <ul className="nav-list-lg">
      <p className="nav-item-lg">Home</p>
      <p className="nav-item-lg">Jobs</p>
    </ul>
    <button className="logout-btn" type="button">
      Logout
    </button>
    <nav className="nav-box-sm">
      <ul className="nav-list">
        <li>
          <AiFillHome className="home-icon" />
        </li>
        <li>
          <GiSuitcase className="jobs-icon" />
        </li>
        <li>
          <FiLogOut className="logout-icon" />
        </li>
      </ul>
    </nav>
  </div>
)

export default Header
