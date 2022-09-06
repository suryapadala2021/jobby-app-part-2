import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

const status = {
  loader: 'loading',
  success: 'success',
  failure: 'fail',
}

class Profile extends Component {
  state = {apiStatus: status.loading, bio: {}}

  componentDidMount() {
    this.getProfileDetails()
  }

  retry = () => {
    this.getProfileDetails()
  }

  getProfileDetails = async () => {
    this.setState({apiStatus: status.loading})
    const jwt = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'Get',
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      const update = {
        name: data.profile_details.name,
        profileImgUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      this.setState({apiStatus: status.success, bio: update})
    } else {
      this.setState({apiStatus: status.failure})
    }
  }

  successView = () => {
    const {bio} = this.state
    return (
      <div className="bio-container">
        <img src={bio.profileImgUrl} alt="profile" className="profile-pic" />
        <h1 className="profile-name">{bio.name}</h1>
        <p className="profile-bio">{bio.shortBio}</p>
      </div>
    )
  }

  failureView = () => (
    <div className="falure-container">
      <button type="button" className="retry-btn" onClick={this.retry}>
        Retry
      </button>
    </div>
  )

  loadingView = () => (
    <div className="loader-container">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  render() {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case status.loading:
        return this.loadingView()
      case status.success:
        return this.successView()
      default:
        return this.failureView()
    }
  }
}
export default Profile
