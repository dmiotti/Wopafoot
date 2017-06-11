import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'

import './App.css'

import Nav from './components/nav/Nav'
import Login from './components/login/Login'
import Players from './components/players/Players'

import { firebaseAuth } from './config/constants'

function PrivateRoute ({component: Component, user, ...rest}) {
  return (
    <Route {...rest} render={(props) => user ?
      <Component {...props} /> :
      <Redirect to={{pathname: '/login', state: {from: props.location}}} />
    }/>
  )
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  componentDidMount() {
    this.removeListener = firebaseAuth().onAuthStateChanged((user) => {
      this.setState({ user: user })
    })
  }
  render() {
    const { user } = this.state
    return (
      <Router>
        <div>
          <Nav user={user} />
          <div className="main container">
            <Route exact={true} path="/" render={() => <Redirect to="/players" />} />
            <Route path="/login" render={() => (
              user ?
                <Redirect to="/players" /> :
                <Login />
            )}/>
            <PrivateRoute user={user} path="/players" component={Players} />
          </div>
        </div>
      </Router>
    )
  }
}

export default App
