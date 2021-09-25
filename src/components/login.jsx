import React from "react";

class Login extends React.Component {
	handleSubmit = (e) => {
		e.preventDefault();

		//call the server
		console.log("Submitted");
	};
	render() {
		return (
			<React.Fragment>
				<div>
					<form onSubmit={this.handleSubmit}>
						<div className='form-group'>
							<label htmlFor='username'>Username</label>
							<input
								autoFocus
								id='username'
								type='text'
								className='form-control'
							/>
						</div>
						<div className='form-group'>
							<label htmlFor='password'>Password</label>
							<input id='password' type='text' className='form-control' />
						</div>
						<button className='btn btn-primary mt-3'>Login</button>
					</form>
				</div>
			</React.Fragment>
		);
	}
}

export default Login;
