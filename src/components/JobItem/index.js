import './index.css'
import {AiFillStar} from 'react-icons/ai'
import {GoLocation} from 'react-icons/go'
import {MdWork} from 'react-icons/md'
import {Link} from 'react-router-dom'

const JobItem = props => {
  const {details} = props
  const {
    id,
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = details

  return (
    <li className="job-item">
      <Link to={`/jobs/${id}`} id="Link">
        <div className="job-item-header">
          <img
            src={companyLogoUrl}
            alt="company logo"
            className="company-logo"
          />
          <div>
            <h1 className="job-title">{title}</h1>
            <div className="rating-container">
              <AiFillStar className="star-icon" />
              <p className="raitng">{rating}</p>
            </div>
          </div>
        </div>
        <div className="job-info-container">
          <div className="job-details-box">
            <div className="rating-container">
              <GoLocation className="location-icon" />
              <p className="raitng">{location}</p>
            </div>
            <div className="rating-container">
              <MdWork className="location-icon" />
              <p className="raitng">{employmentType}</p>
            </div>
          </div>
          <p className="package">{packagePerAnnum}</p>
        </div>
        <hr />
        <h1 className="job-description-heading">Description</h1>
        <p className="job-description">{jobDescription}</p>
      </Link>
    </li>
  )
}
export default JobItem
