import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'
import AuthService from '../services'

class RegisterPage extends Component {
	constructor(props) {
		super(props)

		this.auth = new AuthService()
		this.state = {
			errors: "",
			form: {
				user: {
					userName: "",
					email: "",
					password: "",
				}
			}
		}
	}

	render() {
		let { userName, email, password } = this.state.form.user
		return (
			<main>
				<h2>Welcome! Register here.</h2>
				<form onSubmit={this.onSubmit}>
					<input
            placeholder="User Name"
						type="text"
						name="userName"
						value={userName}
						onChange={this.onChange}
					/>
					<input
            placeholder="Email"
						type="email"
						name="email"
						value={email}
						onChange={this.onChange}
					/>
					{this.state.errors.email && <div>Error: Email  {this.state.errors.email[0]}</div>}
					<input
            placeholder="Password"
						type="password"
						name="password"
						value={password}
						onChange={this.onChange}
					/>
					{this.state.errors.password && <div>Error: Password  {this.state.errors.password[0]}</div>}
					<button onSubmit={this.onSubmit}>Register</button>
				</form>
			</main>
		)
	}

	onChange = (e) => {
		let { form } = this.state

		form.user[e.target.name] = e.target.value

		this.setState({ form })
	}

	onSubmit = (e) => {
		e.preventDefault()

		this.auth.register(this.state.form)
		.then(json => {
			console.log("handling any errors");
			if(json.errors) {
				this.setState({
					errors: json.errors
				})
			}
			return json
		})
	}
}

export default RegisterPage
