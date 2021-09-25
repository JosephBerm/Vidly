import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Movies from "./components/movies";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import pageNotFound from "./components/pageNotFound";
import Navbar from "./components/navBar";
import "./App.css";
import MovieForm from "./components/movieForm";
import Login from "./components/login";

class App extends Component {
	render() {
		return (
			<React.Fragment>
				<Navbar />
				<Switch>
					<Route path='/movies/:id' component={MovieForm}></Route>
					<Route path='/movies' component={Movies}></Route>
					<Route path='/customers' component={Customers}></Route>
					<Route path='/rentals' component={Rentals}></Route>
					<Route path='/login' component={Login}></Route>
					<Route path='/not-found' component={pageNotFound}></Route>
					<Redirect from='/' exact to='/movies' />
					<Redirect to='/not-found' />
				</Switch>
			</React.Fragment>
		);
	}
}

export default App;
