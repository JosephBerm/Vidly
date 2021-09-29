import React from "react";

const Input = ({ label, value, name, autofocus, onChange }) => {
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
		</div>
	);
};

export default Input;
