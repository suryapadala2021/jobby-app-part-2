import './index.css'

const JobItem = props => {
  const {details} = props
  const {
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
      <img
        src={companyLogoUrl}
        alt="company logo"
        className="job-company-logo"
      />
      <h1 className="company-heading">{title}</h1>
    </li>
  )
}
export default JobItem
