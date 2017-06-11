import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Nav.css';

import Logout from '../logout/Logout';

class Nav extends Component {
	render() {
		return (
			<section className="section section-header bg-gray">
				<section className="container">
					<nav className="navbar">
						<section className="navbar-section">
							<Link to="/" className="navbar-brand mr-10">Wopafoot</Link>
							<Link to="/players" className="btn btn-link">Players</Link>
						</section>
						<section className="navbar-section">
							<Logout />
						</section>
					</nav>
				</section>
			</section>
		);
	}
}

export default Nav;
