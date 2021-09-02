import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';
import { getGenres } from '../services/fakeGenreService';
import { paginate } from '../utils/paginate';
import Like from '../common/like';
import Pagination from '../common/pagination';
import ListGroup from '../common/listGroup';

class Movies extends Component
{
    state = {
        movies: [],
        genres: [],
        currentPage: 1,
        pageSize: 4
    };

    componentDidMount()
    {
        const genres = [{ name: 'All Genres', _id: '0' }, ...getGenres()];
        this.setState({ movies: getMovies(), genres });
    }

    handleDelete = (movie) =>
    {
        console.log('Deleted Movie -', movie.title);
        const movies = this.state.movies.filter(m => m._id !== movie._id);
        this.setState({ movies });
    };

    handleLike = (movie) =>
    {
        const movies = [...this.state.movies];
        const index = movies.indexOf(movie);
        movies[index].liked = !movies[index].liked;
        if (movies[index].liked)
        {
            console.log('Liked -', movie.title);
        }
        else
        {
            console.log('Unliked -', movie.title);
        }
        this.setState({ movies });
    };

    handlePagination = (page) =>
    {
        this.setState({ currentPage: page });
        console.log('Now on page -', page);
    };

    handleGenreSelect = (genre) =>
    {
        console.log('Genre selected -', genre.name);
        this.setState({ selectedGenre: genre, currentPage: 1 });
    };

    render()
    {
        const { length: count } = this.state.movies;
        const { currentPage, pageSize, selectedGenre, genres, movies: allMovies } = this.state;

        if (count === 0)
            return <p>There are no movies in the database.</p>;

        const filtered = selectedGenre && (selectedGenre._id !== '0')
            ? allMovies.filter(m => m.genre._id === selectedGenre._id)
            : allMovies;

        const movies = paginate(filtered, currentPage, pageSize);

        return (
            <React.Fragment>
                <h1>There Are { count } Movies In The Database.</h1>
                <div className='row'>
                    <div className='col-3'>
                        <ListGroup
                            items={ genres }
                            selectedItem={ selectedGenre }
                            onItemSelect={ this.handleGenreSelect } />
                    </div>
                    <div className='col-8'>
                        <p>Currently showing { movies.length } movies:</p>
                        <table className="table table-dark table-striped">
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Genre</th>
                                    <th>Stock</th>
                                    <th>Rate</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                { movies.map(movie => (
                                    <tr key={ movie._id }>
                                        <td>{ movie.title }</td>
                                        <td>{ movie.genre.name }</td>
                                        <td>{ movie.numberInStock }</td>
                                        <td>{ movie.dailyRentalRate }</td>
                                        <td>
                                            <Like
                                                onClick={ () => this.handleLike(movie) }
                                                liked={ movie.liked }
                                            />
                                        </td>
                                        <td>
                                            <button
                                                onClick={ () => this.handleDelete(movie) }
                                                className="btn btn-danger">
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                )) }
                            </tbody>
                        </table>
                        <Pagination
                            pageSize={ pageSize }
                            itemsCount={ filtered.length }
                            currentPage={ currentPage }
                            onPageChange={ this.handlePagination } />
                    </div>
                </div>
            </React.Fragment>);
    }
}

export default Movies;;;