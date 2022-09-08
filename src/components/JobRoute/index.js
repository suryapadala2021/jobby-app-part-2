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

  getJobs = async () => {
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

  changeSalary = val => {
    this.setState({salary: val})
  }

  changeType = (val, isCheck) => {
    const {jobType} = this.state
    if (isCheck) {
      const newArr = [...jobType, val]
      this.setState({
        jobType: newArr,
      })
    } else {
      const newArr = jobType.filter(each => each !== val)
      this.setState({jobType: newArr})
    }
  }

  successView = () => {
    const {jobsList} = this.state

    return (
      <ul className="jobs-list">
        {jobsList.map(each => (
          <JobItem key={each.id} details={each} />
        ))}
      </ul>
    )
  }

  loadingView = () => (
    <div className="loader-container">
      <Loader type="ThreeDots" color=" #4f46e5" height="50" width="50" />
    </div>
  )

  failureView = () => <h1>reddy</h1>

  render() {
    const {apiStatus} = this.state
    let value = null
    switch (apiStatus) {
      case status.success:
        value = this.successView()
        break
      case status.loading:
        value = this.loadingView()
        break
      default:
        this.failureView()
    }
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
          <Filters
            employmentTypesList={employmentTypesList}
            salaryRangesList={salaryRangesList}
            changeType={this.changeType}
            changeSalary={this.changeSalary}
          />
          {value}
        </div>
      </div>
    )
  }
}
export default JobRoute
