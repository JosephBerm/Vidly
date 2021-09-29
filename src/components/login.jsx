import React from "react";
import Input from "../common/input";

class Login extends React.Component {
	state = {
		account: { username: "", password: "" },
	};

	handleSubmit = (e) => {
		e.preventDefault();

		//call the server
		console.log("Submitted");
	};

	handleChange = ({ currentTarget: input }) => {
		const account = { ...this.state.account };
		account[input.name] = input.value;

		this.setState({ account });
	};

	render() {
		const { account } = this.state;
		return (
			<div>
				<h1>Login</h1>
				<form onSubmit={this.handleSubmit}>
					<Input
						onChange={this.handleChange}
						value={account.username}
						autofocus={true}
						label='Username'
						name='username'
					/>
					<Input
						onChange={this.handleChange}
						value={account.password}
						autofocus={false}
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
