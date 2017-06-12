import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'

import './App.css'

import Login from './components/login/Login'
import Nav from './components/nav/Nav'
import Register from './components/register/Register'
import Players from './components/players/Players'
import Games from './components/games/Games'
import NewGame from './components/new_game/NewGame'

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
      if (!user) { return; }
      this.setState({ user: user })
      getUserInfo(user).on('value', (snapshot) => {
        this.setState({ user: snapshot.val() })
      })
    })
  }
  render() {
    const { user } = this.state
    const defaultRoute = <Redirect to="/games" />
    return (
      <Router>
        <div>
          <Nav user={user} />
          <div className='main container'>
            <Route exact={true} path='/' render={() => <Redirect to='/players' />} />
            <Route path='/login' render={() => (
              user ? defaultRoute : <Login />
            )}/>
            <Route path='/register' render={() => (
              user ? defaultRoute : <Register />
            )}/>
            <PrivateRoute exact={true} user={user} path='/games' component={Games} />
            <PrivateRoute user={user} path='/games/new' component={NewGame} />
            <PrivateRoute user={user} path='/players' component={Players} />
          </div>
        </div>
      </Router>
    )
  }
}

export default App
