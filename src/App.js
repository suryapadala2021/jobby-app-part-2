import './App.css'
import {Switch, Route} from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import ProtectedRouter from './components/ProtectedRoute'
import JobRoute from './components/JobRoute'
import NotFound from './components/NotFound'
import JobItemDetails from './components/JobItemDetails'
// Replace your code here
const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <ProtectedRouter exact path="/" component={Home} />
    <ProtectedRouter exact path="/jobs" component={JobRoute} />
    <ProtectedRouter exact path="/jobs/:id" component={JobItemDetails} />
    <Route component={NotFound} />
  </Switch>
)

export default App
