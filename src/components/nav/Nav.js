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
								<div>
									<Link to="/players" className="btn btn-link">Players</Link>
									<Link to="/games" className="btn btn-link">Games</Link>
								</div>}
						</section>
						<section className="navbar-section">
							{this.props.user &&
								<div>
									<span className="name">{this.props.user.name}</span>
									<button className="btn btn-primary" onClick={this.handleLogout}>Logout</button>
								</div>}
						</section>
					</nav>
				</section>
			</section>
		);
	}
}

export default Nav
