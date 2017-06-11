import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'

import './App.css'

import Nav from './components/nav/Nav'
import Login from './components/login/Login'
import Register from './components/register/Register'
import Players from './components/players/Players'

import { firebaseAuth } from './config/constants'
import { getUserInfo } from './helpers/auth'

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
      if (!user) {return;}
      getUserInfo(user).on('value', (snapshot) => {
        this.setState({ user: snapshot.val() })
      })
    })
  }
  render() {
    const { user } = this.state
    return (
      <Router>
        <div>
          <Nav user={user} />
          <div className='main container'>
            <Route exact={true} path='/' render={() => <Redirect to='/players' />} />
            <Route path='/login' render={() => (
              user ? <Redirect to="/players" /> : <Login />
            )}/>
            <Route path='/register' render={() => (
              user ? <Redirect to="/players" /> : <Register />
            )}/>
            <PrivateRoute user={user} path='/players' component={Players} />
          </div>
        </div>
      </Router>
    )
  }
}

export default App
