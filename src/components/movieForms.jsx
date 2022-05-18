import React, { Component } from "react";
import { getMovie, saveMovie } from "../services/movieService";
import { getGenres } from "../services/genreService";
import Form from "../common/form";
import Joi from "joi-browser";

class MovieForms extends Form {
	state = {
		data: { title: "", genreId: "", numberInStock: "", dailyRentalRate: "" },
		genres: [],
		errors: {},
	};
	async populateGenres() {
		const { data: genres } = await getGenres();
		this.setState({ genres });
	}
	async populateMovie() {
		try {
			const movieID = this.props.match.params.id;
			if (movieID === "new") return;
			const { data: movie } = await getMovie(movieID);
			this.setState({ data: this.mapMovieInfo(movie) });
		} catch (ex) {
			if (ex.response && ex.response.status === 404)
				this.props.history.replace("/not-found");
		}
	}
	async componentDidMount() {
		await this.populateGenres();
		await this.populateMovie();
	}

	schema = {
		_id: Joi.string(),
		title: Joi.string().required().label("Title"),
		genreId: Joi.string().required().label("Genre"),
		numberInStock: Joi.number()
			.min(0)
			.max(100)
			.required()
			.label("Number in Stock"),
		dailyRentalRate: Joi.number()
			.min(0)
			.max(10)
			.required()
			.label("Daily Rental Rate"),
	};

	mapMovieInfo(movie) {
		return {
			_id: movie._id,
			title: movie.title,
			genreId: movie.genre._id,
			numberInStock: movie.numberInStock,
			dailyRentalRate: movie.dailyRentalRate,
		};
	}

	doSubmit = async () => {
		await saveMovie(this.state.data);

		this.props.history.push("/movies");
	};

	render() {
		const { data, genres } = this.state;
		return (
			<div>
				<h1>Movie Form: {data.title}</h1>
				<form onSubmit={this.handleSubmit}>
					<div className='forms-container'>
						{this.renderInput("title", "Title")}
						{this.renderSelect("genreId", "Genre", genres)}
						{this.renderInput("numberInStock", "Number in Stock")}
						{this.renderInput("dailyRentalRate", "Daily Rental Rate")}
						<div className='container' style={{ marginTop: "25px" }}>
							{this.renderButton("Save")}
						</div>
					</div>
				</form>
			</div>
		);
	}
}

export default MovieForms;

/* 
Use both buttons and then go back in the browser.
See the difference between push and replace?
Push allows you to go back while replace doesn't leave
a history, thus you can't go back.

If I had a sidebar component on this page, I could also use
Route here. When the user clicks on one of the options of the sidebar
you can direct them to exactly where they want to go.

Route component isn't only used in app.js. We can use it anywhere.
What matters is that if the current url matches the path of the route
then we're going to get the given component in that given location.

<Route path = "/movies/users" component={Users} />

if we clicks on "Users" in the sidebar, then we'll get
the component "Users" in the location /movies/users

* Don't forget to import Route at the top. *
import { saveMovie, getMovies } from './../services/fakeMovieService';
import { getGenres } from './../services/genreService';

THIS IS CALLED NESTED ROUTING
*/
