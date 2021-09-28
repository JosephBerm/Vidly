import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import pageNotFound from "./components/pageNotFound";
import MovieForm from "./components/movieForm";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import Movies from "./components/movies";
import Navbar from "./components/navBar";
import Login from "./components/login";
import "./App.css";

class App extends Component {
	render() {
		return (
			<React.Fragment>
				<Navbar />
				<main className='container'>
					<Switch>
						<Route path='/movies/:id' component={MovieForm} />
						<Route path='/customers' component={Customers} />
						<Route path='/not-found' component={pageNotFound} />
						<Route path='/rentals' component={Rentals} />
						<Route path='/movies' component={Movies} />
						<Route path='/login' component={Login} />
						<Redirect from='/' exact to='/movies' />
						<Redirect to='/not-found' />
					</Switch>
				</main>
			</React.Fragment>
		);
	}
}

export default App;
