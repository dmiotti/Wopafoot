import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Logout extends Component {
	constructor(props) {
		super(props);
		this.state = { shouldRedirect: false };
		this.logout = this.logout.bind(this);
	}
	render() {
		return (
			this.state.shouldRedirect ?
				<Redirect to={'/login'}/> :
				<button className="btn btn-primary" onClick={this.logout}>Logout</button>
		);
	}
	logout() {
		this.setState({ shouldRedirect: true });
	}
}

export default Logout;
