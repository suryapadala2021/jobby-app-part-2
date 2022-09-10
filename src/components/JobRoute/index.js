import './index.css'
import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header/index'
import Profile from '../Profile/index'
import Filters from '../Filters/index'
import JobItem from '../JobItem/index'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const status = {
  success: 'success',
  loading: 'loading',
  failure: 'failure',
}

class JobRoute extends Component {
  state = {
    search: '',
    salary: '',
    jobType: [],
    jobsList: [],
    apiStatus: status.loading,
  }

  componentDidMount() {
    this.getJobs()
  }

  changeSearch = event => {
    this.setState({search: event.target.value})
  }

  onSearch = () => {
    this.getJobs()
  }

  getJobs = async () => {
    this.setState({apiStatus: status.loading})
    const {search, salary, jobType} = this.state
    const jwt = Cookies.get('jwt_token')
    const api = `https://apis.ccbp.in/jobs?employment_type=${jobType.join(
      ',',
    )}&minimum_package=${salary}&search=${search}`
    const options = {
      method: 'Get',
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    }
    const response = await fetch(api, options)
    const data = await response.json()
    if (response.ok) {
      const update = data.jobs.map(each => ({
        id: each.id,
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        jobDescription: each.job_description,
        location: each.location,
        packagePerAnnum: each.package_per_annum,
        rating: each.rating,
        title: each.title,
      }))
      this.setState({apiStatus: status.success, jobsList: update})
    } else {
      this.setState({apiStatus: status.failure})
    }
  }

  reloadJobs = () => {
    this.getJobs()
  }

  changeSalary = val => {
    this.setState({salary: val}, this.getJobs)
  }

  changeType = (val, isCheck) => {
    const {jobType} = this.state
    if (isCheck) {
      const newArr = [...jobType, val]
      this.setState(
        {
          jobType: newArr,
        },
        this.getJobs,
      )
    } else {
      const newArr = jobType.filter(each => each !== val)
      this.setState({jobType: newArr}, this.getJobs)
    }
  }

  successView = () => {
    const {jobsList} = this.state
    if (jobsList.length !== 0) {
      return (
        <ul className="jobs-list">
          {jobsList.map(each => (
            <JobItem key={each.id} details={each} />
          ))}
        </ul>
      )
    }
    return (
      <div className="failure-view">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
          className="failure-image"
        />
        <h1 className="failure-heading">No Jobs Found</h1>
        <p className="failure-desciption">
          We could not find any jobs. Try other filters
        </p>
      </div>
    )
  }

  loadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="ThreeDots" color=" #4f46e5" height="50" width="50" />
    </div>
  )

  failureView = () => (
    <div className="failure-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-image"
      />
      <h1 className="failure-heading">Oops! Something went wrong</h1>
      <p className="failure-desciption">
        We cannot seem to find the page you are looking for.
      </p>
      <div className="retry-btn-box">
        <button type="button" className="retry-btn" onClick={this.reloadJobs}>
          Retry
        </button>
      </div>
    </div>
  )

  render() {
    const {apiStatus, search} = this.state
    let value = null
    switch (apiStatus) {
      case status.success:
        value = this.successView()
        break
      case status.loading:
        value = this.loadingView()
        break
      default:
        value = this.failureView()
    }
    return (
      <div className="job-router-container">
        <Header />
        <div className="job-router-box">
          <div className="search-box-sm">
            <input
              onChange={this.changeSearch}
              value={search}
              placeholder="search"
              type="search"
              className="input-element"
            />
            <button type="button" onClick={this.onSearch} testid="searchButton">
              <BsSearch className="search-icon" />
            </button>
          </div>
          <div className="profile-filter-bx-lg">
            <Profile />
            <hr className="divider" />
            <Filters
              employmentTypesList={employmentTypesList}
              salaryRangesList={salaryRangesList}
              changeType={this.changeType}
              changeSalary={this.changeSalary}
            />
          </div>
          <div className="search-jobs-container-lg">
            <div className="search-box-lg">
              <input
                onChange={this.changeSearch}
                value={search}
                placeholder="search"
                type="search"
                className="input-element"
              />
              <button
                type="button"
                onClick={this.onSearch}
                testid="searchButton"
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            {value}
          </div>
        </div>
      </div>
    )
  }
}
export default JobRoute
