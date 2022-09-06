import './index.css'
import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import Header from '../Header/index'
import Profile from '../Profile/index'
import Filters from '../Filters/index'

class JobRoute extends Component {
  render() {
    return (
      <div className="job-router-container">
        <Header />
        <div className="job-router-box">
          <div className="search-box">
            <input
              placeholder="search"
              type="search"
              className="input-element"
            />
            <button type="button">
              <BsSearch className="search-icon" />
            </button>
          </div>
          <Profile />
          <hr className="divider" />
          <Filters />
        </div>
      </div>
    )
  }
}
export default JobRoute
