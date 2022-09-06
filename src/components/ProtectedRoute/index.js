import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

const ProtectedRouter = props => {
  const jwt_token = Cookies.get('jwt_token')
  if (jwt_token === undefined) {
    return <Redirect to="/login" />
  }
  else{
      return <Route to={...props}/>
  }
}
export default ProtectedRouter