import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { login, resetPassword } from '../../helpers/auth'

class LoginForm extends Component {
	constructor(props) {
		super(props)
		this.state = {
			user: {
				email: '',
				password: ''
			},
			isLoggingin: false,
			isResettingPassword: false,
			error: '',
			message: ''
		};
	}
	componentDidMount() {
		this.emailInput.focus()
	}
	isLoading = () => {
		return this.state.isLoggingin || this.state.isResettingPassword
	}
	onSubmit = (e) => {
		e.preventDefault()
		this.setState({ isLoggingin: true, error: '', message: '' })
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
	handleResetPassword = (e) => {
		e.preventDefault()
		this.setState({
			isResettingPassword: true,
			error: '',
			message: ''
		})
		resetPassword(this.state.user.email)
			.then(() => {
				this.setState({
					isResettingPassword: false,
					message: 'Reset instruction sent'
				})
			})
			.catch((error) => {
				this.setState({
					isResettingPassword: false,
					error: error.message
				})
			})
	}
	toggleToast = (e) => {
		this.setState({ error: '', message: '' })
	}
	render() {
		const { user, error, message, isLoggingin, isResettingPassword } = this.state
		return (
			<form onSubmit={this.onSubmit}>
				{error &&
					<div className="toast toast-error">
						<button onClick={this.toggleToast} className="btn btn-clear float-right"></button>
						{error}
					</div>
				}

				{message &&
					<div className="toast toast-success">
						<button onClick={this.toggleToast} className="btn btn-clear float-right"></button>
						{message}
					</div>
				}

				{/* Email */}
				<div className="form-group">
					<label className="form-label" htmlFor="email">Email</label>
					<input name="email"
						ref={(input) => { this.emailInput = input; }}
						className="form-input"
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
							className="form-input"
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
					<button className="btn btn-link" onClick={this.handleResetPassword} disabled={this.isLoading()}>
						{isResettingPassword ? 'Resetting password...' : 'Reset password'}
					</button>
					<div className="float-right">
						<Link to="/register" className="btn btn-primary">Register</Link>
					</div>
				</div>
			</form>
		)
	}
}

export default LoginForm
