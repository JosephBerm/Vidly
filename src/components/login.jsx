import React from "react";
import Input from "../common/input";

class Login extends React.Component {
	state = {
		account: { username: "", password: "" },
		errors: {},
	};

	validateonSubmit = () => {
		const errors = {};
		const { account } = this.state;

		if (account.username.trim() === "") {
			errors.username = "Username is required.";
		}
		if (account.password.trim() === "") {
			errors.password = "Password is required.";
		}

		return Object.keys(errors).length === 0 ? {} : errors;
	};

	handleSubmit = (e) => {
		e.preventDefault();

		const errors = this.validateonSubmit();
		this.setState({ errors });
		if (errors) return;

		//call the server
		console.log("Submitted");
	};

	handleChange = ({ currentTarget: input }) => {
		const account = { ...this.state.account };
		account[input.name] = input.value;

		this.setState({ account });
	};

	render() {
		const { account, errors } = this.state;
		return (
			<div>
				<h1>Login</h1>
				<form onSubmit={this.handleSubmit}>
					<Input
						onChange={this.handleChange}
						value={account.username}
						autofocus={true}
						error={errors.username}
						label='Username'
						name='username'
					/>
					<Input
						onChange={this.handleChange}
						value={account.password}
						autofocus={false}
						error={errors.password}
						label='Password'
						name='password'
					/>
					<button className='btn btn-primary mt-3'>Login</button>
				</form>
			</div>
		);
	}
}

export default Login;
