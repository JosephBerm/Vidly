import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "../common/input";
import Select from "../common/select";

class Form extends Component {
	state = {
		data: {},
		errors: {},
	};

	validate = () => {
		const options = { abortEarly: false };
		const { error } = Joi.validate(this.state.data, this.schema, options);
		if (!error) return null;

		const errors = {};
		for (let item of error.details) {
			errors[item.path[0]] = item.message;
		}

		return errors;
	};

	validateProperty = ({ name, value }) => {
		const obj = { [name]: value };
		const subSchema = { [name]: this.schema[name] };
		const { error } = Joi.validate(obj, subSchema);

		// if (!error) return null;
		// return error.details[0].message;
		//the above code is simplified with the below code

		return error ? error.details[0].message : null;
	};

	handleSubmit = (e) => {
		e.preventDefault();
		const errors = this.validate();
		this.setState({ errors: errors || {} });

		if (errors) return;
		//if error exists, doesn't call server.

		this.doSubmit();
	};

	handleChange = ({ currentTarget: input }) => {
		const errors = { ...this.state.errors };
		const errorMessage = this.validateProperty(input);
		if (errorMessage) errors[input.name] = errorMessage;
		else delete errors[input.name];

		const data = { ...this.state.data };
		data[input.name] = input.value;

		this.setState({ data, errors });
	};

	renderButton(label, classType = "btn btn-primary") {
		return (
			<button disabled={this.validate()} className={classType}>
				{label}
			</button>
		);
	}

	renderInput(name, label, type = "text") {
		const { data, errors } = this.state;
		return (
			<Input
				type={type}
				name={name}
				label={label}
				value={data[name]}
				error={errors[name]}
				onChange={this.handleChange}
			/>
		);
	}

	renderSelect(name, label, options) {
		const { data, errors } = this.state;
		return (
			<Select
				name={name}
				label={label}
				options={options}
				error={errors[name]}
				value={data[name]}
				onChange={this.handleChange}
			/>
		);
	}
}

export default Form;
