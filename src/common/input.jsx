import React, { Component } from "react";

const Input = ({ name, label, error, ...rest }) => {
	console.log(error);
	return (
		<div className='form-group mb-3'>
			<label htmlFor={name} className='form-label'>
				{label}
			</label>
			<input
				className='form-control'
				placeholder={`Enter ${label}`}
				name={name}
				id={name}
				{...rest}
			/>
			{error && <div className='alert alert-danger'>{error}</div>}
		</div>
	);
};

export default Input;

/*
{error && <div className="alert alert-danger">{error}</div>}
What does this mean?
if error is truthy, meaning it there ARE errors, then we'll display
the div. if error is falsey, the && operator short circuits and
the div isn't displayed.

*/
