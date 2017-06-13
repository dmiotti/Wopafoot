import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { register } from '../../helpers/auth'

class RegisterForm extends Component {
	constructor(props) {
		super(props)
		this.state = {
			user: {
				email: '',
				password: '',
				name: ''
			},
			isRegistering: false,
			error: ''
		};
	}
	componentDidMount() {
		this.emailInput.focus()
	}
	isLoading = () => {
		return this.state.isRegistering
	}
	onChange = (e) => {
		const field = e.target.name
		const user = this.state.user
		user[field] = e.target.value
		this.setState({ user: user })
	}
	onSubmit = (e) => {
		e.preventDefault()
		this.setState({ isRegistering: true, error: '' })
		const user = this.state.user
		register(user.name, user.email, user.password)
			.catch((error) => {
				this.setState({ isRegistering: false, error: error.message })
			})
	}
	toggleToast = (e) => {
		this.setState({ error: '' })
	}
	render() {
		const { user, error, isRegistering } = this.state
		return (
			<form onSubmit={this.onSubmit}>
				{error &&
					<div className="toast toast-error">
						<button onClick={this.toggleToast} className="btn btn-clear float-right"></button>
						{error}
					</div>}

				{/* Email */}
				<div className="form-group">
					<label className="form-label" htmlFor="email">Email</label>
					<input name="email"
						className="form-input"
						ref={(input) => { this.emailInput = input; }}
						type="email"
						onChange={this.onChange}
						placeholder="Email"
						value={user.email}
						disabled={this.isLoading()} />
				</div>

				{/* Password */}
				<div className="form-group">
					<label className="form-label" htmlFor="password">Password</label>
					<input name="password"
						className="form-input"
						type="password"
						onChange={this.onChange}
						placeholder="Password"
						value={user.password}
						disabled={this.isLoading()} />
				</div>

				{/* Name */}
				<div className="form-group">
					<label className="form-label" htmlFor="name">Name</label>
					<div className="has-icon-right">
						<input name="name"
							className="form-input"
							type="text"
							onChange={this.onChange}
							placeholder="Name"
							value={user.name}
							disabled={this.isLoading()} />
						{this.isLoading() && <i className="form-icon loading"></i>}
					</div>
				</div>

				<div className="form-group">
					<button className="btn btn-primary" disabled={this.isLoading()}>
						{isRegistering ? 'Registering...' : 'Register'}
					</button>
					<Link to="/login" className="btn btn-link">Login</Link>
				</div>
			</form>
		)
	}
}

export default RegisterForm
