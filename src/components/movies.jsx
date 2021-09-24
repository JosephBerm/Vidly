import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import { paginate } from "../utils/paginate";
import MoviesTable from "./moviesTable";
import Pagination from "../common/pagination";
import ListGroup from "../common/listGroup";
import _ from "lodash";

class Movies extends Component {
	state = {
		movies: [],
		genres: [],
		currentPage: 1,
		pageSize: 4,
		sortColumn: { path: "title", order: "asc" },
	};

	componentDidMount() {
		const genres = [{ name: "All Genres", _id: "" }, ...getGenres()];
		this.setState({ movies: getMovies(), genres });
	}

	handleDelete = (movie) => {
		console.log("Deleted Movie -", movie.title);
		const movies = this.state.movies.filter((m) => m._id !== movie._id);
		this.setState({ movies });
	};

	handleLike = (movie) => {
		const movies = [...this.state.movies];
		const index = movies.indexOf(movie);
		movies[index].liked = !movies[index].liked;
		if (movies[index].liked) {
			console.log("Liked -", movie.title);
		} else {
			console.log("Unliked -", movie.title);
		}
		this.setState({ movies });
	};

	handlePagination = (page) => {
		this.setState({ currentPage: page });
		console.log("Now on page -", page);
	};

	handleGenreSelect = (genre) => {
		console.log("Genre selected -", genre.name);
		this.setState({ selectedGenre: genre, currentPage: 1 });
	};

	handleSort = (sortColumn) => {
		this.setState({ sortColumn });
	};

	getPageData = () => {
		const {
			currentPage,
			pageSize,
			selectedGenre,
			movies: allMovies,
			sortColumn,
		} = this.state;

		const filtered =
			selectedGenre && selectedGenre._id
				? allMovies.filter((m) => m.genre._id === selectedGenre._id)
				: allMovies;

		const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

		const movies = paginate(sorted, currentPage, pageSize);

		return { totalCount: filtered.length, data: movies };
	};

	render() {
		const { length: count } = this.state.movies;
		const { currentPage, pageSize, selectedGenre, genres, sortColumn } =
			this.state;

		const { totalCount, data: movies } = this.getPageData();

		return (
			<React.Fragment>
				<h1>There Are {count} Movies In The Database.</h1>
				<div className='row'>
					<div className='col-3'>
						<ListGroup
							items={genres}
							selectedItem={selectedGenre}
							onItemSelect={this.handleGenreSelect}
						/>
					</div>
					<div className='col-8'>
						<p>Currently showing {totalCount} movies:</p>
						<MoviesTable
							movies={movies}
							sortColumn={sortColumn}
							onLike={this.handleLike}
							onDelete={this.handleDelete}
							onSort={this.handleSort}
						/>
						<Pagination
							pageSize={pageSize}
							itemsCount={totalCount}
							currentPage={currentPage}
							onPageChange={this.handlePagination}
						/>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

export default Movies;
