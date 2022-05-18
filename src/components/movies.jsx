import React, { Component } from "react";
import { Link } from "react-router-dom";
import { paginate } from "./../utils/paginate";
import { toast } from "react-toastify";
import { getGenres } from "../services/genreService";
import { getMovies, deleteMovie } from "../services/movieService";
import Pagination from "./../common/pagination";
import ListGroup from "../common/listGroup";
import MoviesTable from "./moviesTable";
import SearchBox from "./../common/searchBox";
import _ from "lodash";

class Movies extends Component {
	state = {
		movies: [],
		genres: [],
		currentPage: 1,
		pageSize: 4,
		searchQuery: "",
		selectedGenre: null,
		sortColumn: {
			path: "title",
			order: "asc",
		},
	};

	async componentDidMount() {
		const { data } = await getGenres();
		const genres = [{ name: "All Genres", _id: "" }, ...data];
		const { data: movies } = await getMovies();

		this.setState({ movies, genres });
	}

	handleDelete = async (movie) => {
		const originalMoviesList = this.state.movies;
		console.log("Deleting -", movie.title);
		const movies = originalMoviesList.filter((m) => m._id !== movie._id);
		this.setState({ movies });

		try {
			await deleteMovie(movie._id);
		} catch (ex) {
			if (ex.response && ex.response.status === 404) {
				toast.error("This Movie Has Already Deleted!");
			}

			this.setState({ movies: originalMoviesList });
		}
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

	handlePageChange = (page) => {
		this.setState({ currentPage: page });
	};

	handleGenreSelect = (genre) => {
		console.log("Selected Genre -", genre.name);
		this.setState({ selectedGenre: genre, currentPage: 1, searchQuery: "" });
	};

	handleSort = (sortColumn) => {
		this.setState({ sortColumn });
	};

	handleSearch = (query) => {
		this.setState({
			searchQuery: query,
			selectedGenre: null,
			currentPage: 1,
		});
	};

	getPageData = () => {
		const {
			pageSize,
			currentPage,
			sortColumn,
			selectedGenre,
			movies: allMovies,
			searchQuery,
		} = this.state;

		let filtered = allMovies;

		if (searchQuery) {
			filtered = allMovies.filter((m) =>
				m.title.toLowerCase().includes(searchQuery.toLowerCase())
			);
		} else if (selectedGenre && selectedGenre._id) {
			filtered = allMovies.filter((m) => m.genre._id === selectedGenre._id);
		}

		const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

		const movies = paginate(sorted, currentPage, pageSize);

		return { totalCount: filtered.length, data: movies };
	};

	render() {
		const { length: count } = this.state.movies;
		const {
			pageSize,
			currentPage,
			selectedGenre,
			sortColumn,
			genres,
			searchQuery,
		} = this.state;

		if (count === 0) return <p>There are no movies in the database.</p>;

		const { totalCount, data: movies } = this.getPageData();
		return (
			<React.Fragment>
				<h1>Currently showing {totalCount} movies from the database</h1>
				<div className='row'>
					<div className='col'>
						<ListGroup
							items={genres}
							selectedItem={selectedGenre}
							onItemSelect={this.handleGenreSelect}
						/>
					</div>
					<div className='col-9'>
						<Link
							className='btn btn-primary'
							style={{
								color: "white",
								textDecoration: "none",
								marginBottom: "20px",
							}}
							to={"/movies/new"}>
							New Movie
						</Link>
						<SearchBox value={searchQuery} onChange={this.handleSearch} />
						<MoviesTable
							movies={movies}
							sortColumn={sortColumn}
							onLike={this.handleLike}
							onDelete={this.handleDelete}
							onSort={this.handleSort}
						/>
						<Pagination
							itemsCount={totalCount}
							pageSize={pageSize}
							currentPage={currentPage}
							onPageChange={this.handlePageChange}
						/>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

export default Movies;
