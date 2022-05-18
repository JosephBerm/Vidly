import React, { Component } from "react";
import Form from "./../common/form";
import Joi from "joi-browser";
import * as userService from "../services/userService";
// import { register } from "../services/userService";

class RegisterForm extends Form {
	state = {
		data: {
			email: "",
			password: "",
			name: "",
		},
		errors: {},
	};

	schema = {
		email: Joi.string().email().required().label("Email"),
		password: Joi.string().min(5).required().label("Password"),
		name: Joi.string().required().label("Name"),
	};

	doSubmit = async () => {
		try {
			await userService.register(this.state.data);
		} catch (ex) {
			if (ex.response && ex.response.status === 400) {
				const errors = { ...this.state.errors };
				errors.email = ex.response.data;
				this.setState({ errors });
			}
		}
	};
	render() {
		return (
			<React.Fragment>
				<h1>Register</h1>
				<form onSubmit={this.handleSubmit}>
					<div className='forms-container'>
						{this.renderInput("email", "Username")}
						{this.renderInput("password", "Password", "password")}
						{this.renderInput("name", "Name")}
						<div className='container' style={{ marginTop: "25px" }}>
							{this.renderButton("Register")}
						</div>
					</div>
				</form>
			</React.Fragment>
		);
	}
}

export default RegisterForm;
