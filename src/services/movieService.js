import http from "./httpService";
import config from "../config.json";

function movieURL(id) {
	return `${config.apiEndpoint}/movies/${id}`;
}

export function getMovies() {
	return http.get(config.apiMovies);
}

export function deleteMovie(movieId) {
	return http.delete(movieURL(movieId));
}

export function getMovie(movieId) {
	return http.get(movieURL(movieId));
}

export function saveMovie(movie) {
	if (movie._id) {
		const body = { ...movie };
		delete body._id;
		return http.put(movieURL(movie._id), body);
	}

	return http.post(config.apiMovies, movie);
}
