import React from "react";

const Input = ({ label, value, name, autofocus, error, onChange }) => {
	return (
		<div className='form-group'>
			<label htmlFor={name}>{label}</label>
			<input
				autoFocus={autofocus}
				value={value}
				onChange={onChange}
				name={name}
				id={name}
				type={name === "password" ? "password" : "text"}
				className='form-control'
			/>
			{error && <div className='alert alert-danger'>{error}</div>}
		</div>
	);
};

export default Input;
