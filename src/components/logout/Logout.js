import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { logout } from '../../helpers/auth'

class Logout extends Component {
	render() {
		return (
			<button className="btn btn-primary" onClick={this.handleLogout}>Logout</button>
		)
	}
	handleLogout = logout
}

export default Logout
