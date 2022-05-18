import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import RenderCounters from "./components/renderCounters";
import NotFound from "./components/notFound";
import NavBar from "./components/navBar";
import Movies from "./components/movies";
import Login from "./components/login";
import Home from "./components/home";
import MovieForms from "./components/movieForms";
import LoginJoi from "./components/loginJoi";
import RegisterForm from "./components/register";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

class App extends Component {
	render() {
		// console.log("App - Rendered");
		console.log("Review Section - Calling Backend Services #25-31");

		return (
			<React.Fragment>
				<ToastContainer />
				<NavBar />
				<div className='container'>
					<Switch>
						<Route path='/movies/:id' component={MovieForms} />
						<Route path='/movies' component={Movies} />
						<Route path='/counters' component={RenderCounters} />
						<Route path='/login-joi' component={LoginJoi} />
						<Route path='/login' component={Login} />
						<Route path='/register' component={RegisterForm} />
						<Route path='/not-found' component={NotFound} />
						<Route path='/home' exact component={Home} />
						<Redirect from='/' exact to='/home' />
						<Redirect to='/not-found' />
						{/* To Redirect, you can also add: from ="" */}
					</Switch>
				</div>
			</React.Fragment>
		);
	}
}

export default App;
/* To pass a prop, you must do it in the following way:
<Route path='/movies/:id' render = {() => <Component propname ="something"/>} /> 
However, the other props (history, location, and match)
have disappeared. Therefore, you must pass props into it
<Route path='/movies/:id' render =
{(props) => <Component propname ="something" {...props}/>} />

// <Route path='/movies/:id' component={MovieForms} />

noticed the : ? That's called a route parameter
to define a parameter, you must prefix it with a colon (:) first
you can even do path="movies/:genre/:name"
this creates multiple parameters. DONT FORGET: MOST SPECIFIC FIRST
in javascript when you append a ? to an expression, you make it optional
Therefore, you can do path="movies/:genre?/:name?" [But you should avoid this]
If you don't do this, it NEEDS both parameters or
it will go to the next one that closely matches...

the reason you want to avoid it is because it's not good practice. Instead
you can use query-string. To install:
npm i query-string@6.1.0
to import: import queryString from 'query-string';
to use it: import RegisterForm from './components/register';
const result = queryString.parse(location.search);
or you can do object destructuring:
const {parameterName (such as sortBy)} = queryString.parse(location.search);
console.log(result);

Notice how the values are always a string. If you want to deal with numbers or booleans,
you will have to parse them accordingly.
*/
