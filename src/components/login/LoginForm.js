import React, { Component } from 'react'
import { login, register } from '../../helpers/auth'

class LoginForm extends Component {
	constructor(props) {
		super(props)
		this.state = {
			user: {
				email: '',
				password: ''
			},
			isLoggingin: false,
			isRegistering: false,
			emailInputClass: '',
			passwordInputClass: '',
			error: ''
		};
	}
	isLoading = () => {
		return this.state.isLoggingin || this.state.isRegistering
	}
	onSubmit = (e) => {
		e.preventDefault()
		this.setState({ isLoggingin: true, error: '' })
		login(this.state.user.email, this.state.user.password)
			.catch((error) => {
				this.setState({ isLoggingin: false, error: error.message })
			})
	}
	onChange = (e) => {
		const field = e.target.name
		const user = this.state.user
		user[field] = e.target.value
		this.setState({ user: user })
	}
	register = (e) => {
		e.preventDefault()
		this.setState({ isRegistering: true, error: '' })
		register(this.state.user.email, this.state.user.password)
			.catch((error) => {
				this.setState({ isRegistering: false, error: error.message })
			})
	}
	render() {
		const { user, error, isLoggingin, isRegistering, emailInputClass, passwordInputClass } = this.state
		return (
			<form onSubmit={this.onSubmit}>
				{error && <div className="toast toast-error">{error}</div>}

				{/* Email */}
				<div className="form-group">
					<label className="form-label" htmlFor="email">Email</label>
					<input name="email"
						className={'form-input ' + emailInputClass}
						type="email"
						onChange={this.onChange}
						placeholder="Email"
						value={user.email}
						disabled={this.isLoading()} />
				</div>

				{/* Password */}
				<div className="form-group">
					<label className="form-label" htmlFor="password">Password</label>
					<div className="has-icon-right">
						<input name="password"
							className={'form-input ' + passwordInputClass}
							type="password"
							onChange={this.onChange}
							placeholder="Password"
							value={user.password}
							disabled={this.isLoading()} />
						{this.isLoading() && <i className="form-icon loading"></i>}
					</div>
				</div>

				<div className="form-group">
					<button className="btn btn-primary" disabled={this.isLoading()}>
						{isLoggingin ? 'Logging in...' : 'Login'}
					</button>
					<button className="btn btn-link" onClick={this.register} disabled={this.isLoading()}>
						{isRegistering ? 'Registering...' : 'Register'}
					</button>
				</div>
			</form>
		)
	}
}

export default LoginForm
