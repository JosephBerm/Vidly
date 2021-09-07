import React from 'react';
import Like from '../common/like';

const MoviesTable = (props) =>
{
    const { movies, onLike, onDelete, onSort } = props;
    return (
        <table className="table table-dark table-striped">
            <thead>
                <tr>
                    <th
                        style={ { cursor: 'pointer' } }
                        onClick={ () => onSort('title') }>
                        Title
                    </th>
                    <th
                        style={ { cursor: 'pointer' } }
                        onClick={ () => onSort('genre.name') }>
                        Genre
                    </th>
                    <th
                        style={ { cursor: 'pointer' } }
                        onClick={ () => onSort('numberInStock') }>
                        Stock
                    </th>
                    <th
                        style={ { cursor: 'pointer' } }
                        onClick={ () => onSort('dailyRentalRate') }>
                        Rate
                    </th>
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
                                onClick={ () => onLike(movie) }
                                liked={ movie.liked }
                            />
                        </td>
                        <td>
                            <button
                                onClick={ () => onDelete(movie) }
                                className="btn btn-danger">
                                Delete
                            </button>
                        </td>
                    </tr>
                )) }
            </tbody>
        </table>
    );
};

export default MoviesTable;