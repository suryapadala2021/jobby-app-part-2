import './index.css'
import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import Header from '../Header/index'
import Profile from '../Profile/index'
import Filters from '../Filters/index'

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

class JobRoute extends Component {
  state = {search: '', salary: '', jobType: []}

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

  render() {
    const {jobType} = this.state
    console.log(jobType)
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
        </div>
      </div>
    )
  }
}
export default JobRoute
