import React, { Component } from 'react';

class LoginForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: {
				email: '',
				password: ''
			},
			isLoading: false,
			emailInputClass: '',
			passwordInputClass: ''
		};
	}
	onSubmit = (e) => {
		e.preventDefault();
		this.setState({ isLoading: true });
	}
	onChange = (e) => {
		const field = e.target.name;
		const user = this.state.user;
		user[field] = e.target.value;
		this.setState({ user: user });
	}
	register = (e) => {
		e.preventDefault();
	}
	render() {
		const { user, isLoading, emailInputClass, passwordInputClass } = this.state;
		return (
			<form onSubmit={this.onSubmit}>
				{/* Email */}
				<div className="form-group">
					<label className="form-label" htmlFor="email">Email</label>
					<input className={'form-input ' + emailInputClass}
						type="email"
						onChange={this.onChange}
						name="email"
						placeholder="Email"
						value={user.email}
						disabled={isLoading}/>
				</div>

				{/* Password */}
				<div className="form-group">
					<label className="form-label" htmlFor="password">Password</label>
					<div className="has-icon-right">
						<input className={'form-input ' + passwordInputClass}
							type="password"
							onChange={this.onChange}
							name="password"
							placeholder="Password"
							value={user.password}
							disabled={isLoading}/>
					</div>
				</div>

				<div className="form-group">
					<button className="btn btn-primary" disabled={isLoading}>
						{isLoading ? 'Logging in...' : 'Login'}
					</button>
					<button className="btn btn-link" onClick={this.register} disabled={isLoading}>
						Register
					</button>
				</div>
			</form>
		);
	}
}

export default LoginForm;
