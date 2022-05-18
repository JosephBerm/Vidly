import React, { Component } from "react";
import Joi from "joi-browser";
import Form from "../common/form";
import { Link } from "react-router-dom";
import { login } from "../services/authService";

class LoginJoi extends Form {
	state = {
		data: { email: "", password: "" },
		errors: {},
	};

	schema = {
		email: Joi.string().required().label("Email"),
		password: Joi.string().required().label("Password"),
	};

	doSubmit = async () => {
		try {
			const { data } = this.state;
			await login(data.email, data.password);
		} catch (ex) {
			if (ex.response && ex.response.status === 400) {
				const errors = { ...this.state.errors };
				errors.email = ex.response.data;
				this.setState({ errors });
			}
		}
		//call server
		console.log("Submitted.");
	};

	render() {
		return (
			<React.Fragment>
				<h1>Login With Joi Validation</h1>
				<form onSubmit={this.handleSubmit}>
					<div className='forms-container'>
						{this.renderInput("email", "Email")}
						{this.renderInput("password", "Password", "password")}
						<div className='container' style={{ marginTop: "25px" }}>
							{this.renderButton("Login")}
							<p style={{ color: "rgb(212, 212, 212)", marginTop: "10px" }}>
								New User?{" "}
								<Link style={{ textDecoration: "none" }} to='/register'>
									Register!
								</Link>
							</p>
						</div>
					</div>
				</form>
			</React.Fragment>
		);
	}
}

export default LoginJoi;

/*

MOST OF THIS HAS BEEN MOVED TO FORM.JSX SEE THE LAST COMMENT SECTION BELOW.


To use Joi:
npm i joi-browser
import Joi from "joi-browser"

Declare a schema of the objects you want to validate.

in validate:
const result = Joi.validate(this.state.data, this.schema);
		console.log(result);

Save and then press the Login button.
If you open the object displayed in the console and go to
error>details you will notice how there's only one error message
while you're leaving both fields empty.

This is because Joi aborts early. In order to prevent this from happening,
you have to toggle the option as a third parameter to the Joi.validate().
By default abortEarly = true.

The Solution:
const result = Joi.validate(this.state.data, this.schema, {
			abortEarly: false,
		});
		console.log(result);

Now press login and open the object to the same location.
Now notice there are two error messages instead of one.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

You can set attributes of an object in a static or 
dynamic way. For example:

const yayo = 10;

const obj = {};
console.log(obj)
output: obj > {}
console.log(obj["firstName"])
output: undefined

obj["firstName"] = "Joseph"
obj.lastName = "Bermudez"
console.log(obj)
output: obj > {firstName: "Joseph", lastName: "Bermudez"}

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

for validating onChange using validateProperty, you don't want to validate
the entire form, thus you have to take a different approach. You should
create a new object with a single property. The name of the property should
set dynamically. It's based on the value of the name argument.
For example:
validateProperty = ({ name, value }) => {
		const obj = { [name]: value };
	};

the reason you have to put the [] around name is because of something called
computed properties. This was released in ES6. You do this when you don't want
to hardcode a property name in an object, but you want to set it dynamically.

ES6 allows you to use an expression in brackets []. It’ll then use the result
of the expression as the property name of an object.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

I KNOW ITS A COPY AND PASTE BUT IT'S FOR THE SAME TOPIC. READ ANYWAY!!!!

for validating onChange using validateProperty, you don't want to validate
the entire form, thus you have to take a different approach WITH THE SCHEMA
as well. You can't pass this.schema because it's the schema for the entire form
not for the one specific input element.
If you pass obj and validate it with this.schema, Joi is going to scream at you
for having missing properties. So, you need to provide a subSchema.

Example:
const subSchema = {[name]: this.schema[name]}

Notice how the name is set dynamically and value is this.schema[name].
if name is "username" than it would (behind the scenes) look like this:

subSchema = {"username": this.schema["username"]}

this.schema["username"] = Joi.string().required().label("Username")

why? because this.schema looks like this:

schema = {
		username: Joi.string().required().label("Username"),
		password: Joi.string().required().label("Password"),
	};

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Also added something to the button. If you want to only enable the button
to be clickable when all inputs have parameters, you can pass this.validate().

Example:
disabled = {this.validate()}

The reason this works is because the function this.validate() either returns null
or an error object that has errors in it. null is considered falsey, therefore
it's the same thing as saying disabled = {false}.
if disabled is false because the function returned null, it's because there're no
errors and there's no reason to disable the button. If validate returns and object of
errors, it's the same thing as saying disabled = {true}. This means errors do exist
and the submit button isn't ready to be pressed.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
!!!!!! WHY THE CODE WAS MOVED !!!!!! (Lesson 18)

We did code refactoring and simplified this file. Now, we don't have
to recreate the whole validation process. It's reusable because it's in
a .jsx called form.jsx. All the code in Form.jsx was originally
inside this file. Only the reusable things were put into that file.
The nonreusable things were moved into a method of its own in this file
and the methods moved over make a reference to the newly created method.
Look at handleSubmit in form.jsx and how it references this.doSubmit()
which is in this file.

Dont forget that in order for this to work, you must extend Form from Form.jsx

To reuse it:
Next time we want to initialize a form, we just need to extend form,
initialize a state, initialize a schema for that form, determine what
should happen when the form is submitted (doSubmit()), and finally...
decide what to return when the form is rendered ...

*/

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
handleSubmit was declared originally, but since the final
part of the function called the server and did a specific operation,
we can't extract that part of the function to form.jsx.
It's a specific operation because not all forms are for the same purpose.
Therefore, we're extracting the server call and the console.log() in
and leaving it in this jsx file. This jsx file can have it's own way
of doing a server call.
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
