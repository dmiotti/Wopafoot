import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// Import default css
import 'spectre.css/dist/spectre.min.css';
import 'spectre.css/dist/spectre-icons.css';

import './App.css';

import Nav from './components/nav/Nav';
import Login from './components/login/Login';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Nav />
          <div className="main container">
            <Route path="/login" component={Login}/>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
