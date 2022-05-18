import React, { Component } from "react";
import Input from "../common/input";

class Login extends Component {
	state = {
		account: { username: "", password: "" },
		errors: {},
	};

	validate = () => {
		const errors = {};

		const { account } = this.state;
		//checking to see if either is empty.
		if (account.username.trim() === "")
			errors.username = "Username is required.";
		if (account.password.trim() === "")
			errors.password = "Password is required.";

		return Object.keys(errors).length === 0 ? null : errors;
	};

	handleSubmit = (e) => {
		e.preventDefault();
		const errors = this.validate();
		console.log(errors);

		this.setState({ errors: errors || {} });
		// what is the purpose of this?
		//Original this.setState({ errors });
		//Well, if there're no errors, than this.validate() returns
		//null. In the inputs, you're passing null and it crashes.
		//The fix: if errors isn't empty, pass it, if it is empty
		//than pass an empty object. This will prevent a crash.
		//therefore, our errors object is ALWAYS set to an object.
		//IT SHOULD NEVER BE NULL OR IT WILL GET THE ERROR.

		if (errors) return;
		//if error exists, doesn't call server.

		//call server
		console.log("Submitted.");
	};

	validateProperty = ({ name, value }) => {
		if (name === "username") {
			if (value.trim() === "") return "Username is required.";
		}
		if (name === "password") {
			if (value.trim() === "") return "Password is required.";
		}
	};

	// handleChange = (e) => {
	// 	const account = { ...this.state.account };
	// 	account[e.currentTarget.name] = e.currentTarget.value;
	// 	this.setState({ account });
	// };
	//I commented it out for least confusion... you can use object destructuring.
	//on top of the destructuring, I'm renaming it as input.
	handleChange = ({ currentTarget: input }) => {
		const errors = { ...this.state.errors };
		const errorMessage = this.validateProperty(input);
		if (errorMessage) errors[input.name] = errorMessage;
		else delete errors[input.name];

		const account = { ...this.state.account };
		account[input.name] = input.value;

		this.setState({ account, errors });
	};

	/*
	SOMETHING IMPORTANT TO NOTE. THE input.value INSIDE
	THE HANDLE CHANGE FUNCTION IS NOT THE SAME VALUE
	THAT IS DECLARED INSIDE THE INPUT FIELDS. THEY ARE TWO
	DIFFERENT VARIABLES THAT HAPPENT TO HAVE THE SAME NAME,
	"VALUES". THE VALUE INSIDE THE HANDLER IS WHATEVER IS
	TYPED IN THE currentTarget (aka input).

	For more info, go to the bottom notes.
	*/

	render() {
		const { account, errors } = this.state;

		return (
			<React.Fragment>
				<h1>Login Without Joi Validation</h1>
				<form onSubmit={this.handleSubmit}>
					<div className='forms-container'>
						<Input
							name={"username"}
							label='Username'
							value={account.username}
							error={errors.username}
							onChange={this.handleChange}
							autoFocus
							type='text'
						/>
						<Input
							name={"password"}
							label='Password'
							value={account.password}
							error={errors.password}
							onChange={this.handleChange}
							type='password'
						/>

						<button type='submit' className='btn btn-primary'>
							Login
						</button>
					</div>
				</form>
			</React.Fragment>
		);
	}
}

export default Login;

/*
Note how "htmlFor" in the label has the same attribute as the id of
the input field. That's because the value of the htmlFor is the ID of
the input field. Also notice how the input fields have "form-control" in className.

you can set autoFocus to false but by default it's on true. That's why
you can leave it as "autoFocus". like an if statement if(boolCheck) instead of
if (boolCheck === true).
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
if you want access to the DOM elements and the values passed to it, you can do it
by using refs. In this example, you create:
username = React.createRef().

in componentDidMount, you can use that reference to set a focus on the
input field that you want.

You can use that reference however you want. I used it in the console.log() inside
the handleSubmit function.

HOWEVER, USING REFS ISN'T THE PROPER WAY TO USE THE INPUT FIELD AND THE VALUES
PASSED TO IT.

THIS WAS ABOVE THE HANDLESUBMIT:
// username = React.createRef();

	//if you're using Ref's, you can focus the input field automatically
	//by using the code below. But there's a better way. You can use the
	//keyword "autoFocus" in the input field.

	// componentDidMount() {
	// 	this.username.current.focus();
	// }

	THIS WAS INSIDE THE HANDLESUBMIT:
	
		//at this point, we will call the server,
		//submit the changes
		//then redirect the user to another page.
		// const username = this.username.current.value;
		// console.log("Submitted.", username);
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
before further changes, at this point in time (to future Joseph),
the state has been created but hasn't been linked to the input fields.
Therefore, the state at the top and the state in the input fields, are
two different states. The input field has it's own state since it hasn't been
linked to the state at the top.

So, what we must do is eliminate the state of the input field and only rely
on the state in the account object that is inside the state. (it's a state object)

we set the value of the input field to the value of the state object.
so for username: value = {this.state.account.username}

however, with this change alone, you're making the username field bound to
the state object's empty string. So, if you start trying to type in the input field
nothing changes. Why? Because the value of the input field = this.state.account.username
which at this point in time, is only an empty string.

What's the fix? We need to handle the change of whatever happens in the input field
and then update the state.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

SOMETHING IMPORTANT TO NOTE. THE input.value INSIDE
THE HANDLE CHANGE FUNCTION IS NOT THE SAME VALUE
THAT IS DECLARED INSIDE THE INPUT FIELDS. THEY ARE TWO
DIFFERENT VARIABLES THAT HAPPENT TO HAVE THE SAME NAME,
"VALUES". THE VALUE INSIDE THE HANDLER IS WHATEVER IS
TYPED IN THE currentTarget (aka input).


I know this because I changed the name of the values delcared
inside the input fields and it's still able to track it.

why then do we need to declare value inside the input fields?
To ensure that there is only one single source of truth and
for making the component a CONTROLLED component.
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
COMMON MISTAKES:
If you were to delete account.username from state and only leave password,
the program will return an error when you type inside input>username
because of "value" in the prop. Explanation: When you declare
value = {account.username} you're wanting to make it a controlled component.
It's initially and uncontrolled component because account.username wouldn't exist.
But when you declare value={account.username} and username inside 
account object, you're making it a controlled component and a single
source of truth.

Without username inside the state object, value={account.username} === undefined.
You can't control undefined values or null values.

Thus, 
account: {username: null, password: ""}
wouldn't work either.

For this reason, we have declared both as an empty string.
account: {username: "", password: ""}

AS A RULE OF THUMB - WHENEVER YOU'RE BUILDING FORMS,
YOU SHOULD INITIALIZE THE PROPERTIES OF YOUR STATE OBJECT
EITHER TO AN EMPTY STRING OR TO SOME VALUE THAT YOU GET FROM A SERVER.


BEFORE SEPARATING THE FORM INTO THE INPUT.JSX, THE INPUT LOOKED
LIKE THIS:
<div className='form-group mb-3'>
	<label htmlFor='email' className='form-label'>
	Email Address
	</label>
	<input
		// ref={this.username} //THIS WAS USED FOR REF EXAMPLE
		value={account.username}
		onChange={this.handleChange}
		placeholder='Enter email'
		className='form-control'
		name='username'
		type='text'
		id='email'
		autoFocus
	/>
</div>

*/
