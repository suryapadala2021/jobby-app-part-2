import './index.css'
import {AiFillStar} from 'react-icons/ai'
import {GoLocation} from 'react-icons/go'
import {MdWork} from 'react-icons/md'

const SimilarJobItem = props => {
  const {details} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = details
  return (
    <li className="similar-job-item">
      <div className="job-item-header">
        <img src={companyLogoUrl} alt="company logo" className="company-logo" />
        <div>
          <h1 className="sim-job-title">{title}</h1>
          <div className="rating-container">
            <AiFillStar className="star-icon" />
            <p className="raitng">{rating}</p>
          </div>
        </div>
      </div>

      <h1 className="sim-job-description-heading">Description</h1>
      <p className="job-description">{jobDescription}</p>
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
      </div>
    </li>
  )
}
export default SimilarJobItem
