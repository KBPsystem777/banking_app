import React from "react"
import { connect } from "react-redux"
import { Route, Switch, Router } from "react-router-dom"
import Login from "../components/Login"
import Register from "../components/Register"
import Profile from "../components/Profile"
import { createBrowserHistory } from "history"
import Logout from "../components/Logout"
export const history = createBrowserHistory()

const AppRouter = () => {
  return (
    <Router history={history}>
      <div className="container">
        <Switch>
          <Route path="/" component={Login} exact={true} />
          <Route path="/register" component={Register} exact={true} />
          <Route path="/profile" component={Profile} />
          <Route path="/logout" component={Logout} />
        </Switch>
      </div>
    </Router>
  )
}

const mapStateToProps = (state) => ({
  auth: state.auth,
})

export default connect(mapStateToProps)(AppRouter)
