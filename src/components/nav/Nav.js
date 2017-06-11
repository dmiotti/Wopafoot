import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import './Nav.css'

import { logout } from '../../helpers/auth'

class Nav extends Component {
	handleLogout() {
		logout()
	}
	render() {
		return (
			<section className="section section-header bg-gray">
				<section className="container">
					<nav className="navbar">
						<section className="navbar-section">
							<Link to="/" className="navbar-brand mr-10">Wopafoot</Link>
							{this.props.user &&
								<Link to="/players" className="btn btn-link">Players</Link>}
						</section>
						<section className="navbar-section">
							{this.props.user &&
								<button className="btn btn-primary"
									onClick={this.handleLogout}>Logout</button>}
						</section>
					</nav>
				</section>
			</section>
		);
	}
}

export default Nav
