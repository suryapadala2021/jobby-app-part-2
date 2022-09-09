import './index.css'
import {Link} from 'react-router-dom'
import Header from '../Header/index'

const Home = () => (
  <div className="home-container">
    <Header />
    <div className="home-box">
      <div className="text-content-box">
        <h1 className="home-main-heading">Find The Job That Fits Your Life</h1>
        <p className="home-description">
          Millions of people are searching for jobs,salary information,company
          reviews.Find the job that fir your abilities and potential.
        </p>
        <Link to="/jobs">
          <button type="button" className="find-btn">
            Find Jobs
          </button>
        </Link>
      </div>
    </div>
  </div>
)

export default Home
