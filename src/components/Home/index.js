import './index.css'
import Header from '../Header/index'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

const Home = () => {
  const jwt_token = Cookies.get('jwt_token')
  if (jwt_token !== undefined) {
    return <Redirect to="/" />
  }
  return (
    <div className="home-container">
      <Header />
      <div className="home-box">
        <div className="text-content-box">
          <h1 className="home-main-heading">
            Find The Job That Fits Your Life
          </h1>
          <p className="home-description">
            Millions of people are searching for jobs,salary information,company
            reviews.Find the job that fir your abilities and potential.
          </p>
          <button type="button" className="find-btn">
            Find Jobs
          </button>
        </div>
      </div>
    </div>
  )
}
export default Home
