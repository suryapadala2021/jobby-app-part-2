import './index.css'
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {AiFillStar} from 'react-icons/ai'
import {GoLocation} from 'react-icons/go'
import {MdWork} from 'react-icons/md'
import {BiLinkExternal} from 'react-icons/bi'
import Header from '../Header/index'
import SimilarJobItem from '../SimilarJobItem/index'

const status = {
  success: 'success',
  failure: 'failure',
  loading: 'loading',
}
class JobItemDetails extends Component {
  state = {apiStatus: status.loading, job: {}}

  componentDidMount() {
    this.getJob()
  }

  resetJobDetails = () => {
    this.getJob()
  }

  getJob = async () => {
    const jwt = Cookies.get('jwt_token')

    const {match} = this.props
    const {params} = match
    const {id} = params

    const url = `https://apis.ccbp.in/jobs/${id.split(':')[0]}`
    const options = {
      method: 'Get',
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      console.log(data)

      const update = {
        jobDetails: {
          companyLogoUrl: data.job_details.company_logo_url,
          companyWebsiteUrl: data.job_details.company_website_url,
          employmentType: data.job_details.employment_type,
          jobDescription: data.job_details.job_description,
          lifeAtCompany: {
            description: data.job_details.life_at_company.description,
            imageUrl: data.job_details.life_at_company.image_url,
          },
          location: data.job_details.location,
          packagePerAnnum: data.job_details.package_per_annum,
          rating: data.job_details.rating,
          skills: data.job_details.skills.map(each => ({
            name: each.name,
            imageUrl: each.image_url,
          })),
          title: data.job_details.title,
        },
        similarJobs: data.similar_jobs.map(each => ({
          companyLogoUrl: each.company_logo_url,
          employmentType: each.employment_type,
          id: each.id,
          jobDescription: each.job_description,
          location: each.location,
          rating: each.rating,
          title: each.title,
        })),
      }
      this.setState({apiStatus: status.success, job: update})
    } else {
      this.setState({apiStatus: status.failure})
    }
  }

  loadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="ThreeDots" color="#121212" height="50" width="50" />
    </div>
  )

  failureView = () => (
    <div className="failure-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-desciption">
        We cannot seem to find the page you are looking for
      </p>
      <button
        type="button"
        className="retry-btn"
        onClick={this.resetJobDetails}
      >
        Retry
      </button>
    </div>
  )

  successView = () => {
    const {job} = this.state
    const {jobDetails, similarJobs} = job
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      lifeAtCompany,
      location,
      packagePerAnnum,
      rating,
      skills,
      title,
    } = jobDetails
    console.log(similarJobs)
    return (
      <>
        <div className="specific-job-detail-container">
          <div className="specific-job-header">
            <img
              className="specific-job-company-logo"
              src={companyLogoUrl}
              alt="job details company logo"
            />
            <div>
              <h1 className="specific-job-detail-title">{title}</h1>
              <div className="details-rating-container">
                <AiFillStar className="specific-star-icon" />
                <p className="specific-rating">{rating}</p>
              </div>
            </div>
          </div>
          <div className="specific-job-info-container">
            <div className="specific-job-location-type-box">
              <div className="details-location-container">
                <GoLocation className="job-details-location-icon" />
                <p className="specific-location-details">{location}</p>
              </div>
              <div className="details-location-container">
                <MdWork className="job-details-location-icon" />
                <p className="specific-location-details">{employmentType}</p>
              </div>
            </div>
            <p className="job-details-package">{packagePerAnnum}</p>
          </div>
          <hr />
          <div className="job-details-description-container">
            <h1 className="specific-job-description-heading">Description</h1>
            <a href={companyWebsiteUrl}>
              <div className="company-link-box">
                <p className="visit-link-text">Visit</p>
                <BiLinkExternal className="link-icon" />
              </div>
            </a>
          </div>
          <p className="specific-job-description">{jobDescription}</p>
          <div className="skills-section">
            <h1 className="specific-job-description-heading">Skills</h1>
            <ul className="skills-set">
              {skills.map(each => (
                <li key={each.name} className="skill">
                  <img
                    className="skill-img"
                    src={each.imageUrl}
                    alt={each.name}
                  />
                  <p className="skill-name">{each.name}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="life-at-container">
            <div className="life-at-text-container">
              <h1 className="specific-job-description-heading">
                Life at Company
              </h1>
              <p className="specific-job-description">
                {lifeAtCompany.description}
              </p>
            </div>
            <img
              src={lifeAtCompany.imageUrl}
              alt="life at company"
              className="life-at-image"
            />
          </div>
        </div>
        <div className="similar-jobs-container">
          <h1 className="similar-jobs-heading">Similar Jobs</h1>
          <ul className="similar-jobs-list">
            {similarJobs.map(each => (
              <SimilarJobItem key={each.id} details={each} />
            ))}
          </ul>
        </div>
      </>
    )
  }

  render() {
    const {apiStatus} = this.state
    let value = null
    switch (apiStatus) {
      case status.loading:
        value = this.loadingView()
        break
      case status.success:
        value = this.successView()
        break
      default:
        value = this.failureView()
    }

    return (
      <div className="job-det-container">
        <Header />
        <div className="specific-job-details-box">{value}</div>
      </div>
    )
  }
}
export default JobItemDetails
