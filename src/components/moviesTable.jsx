import React from 'react';
import Like from '../common/like';
import TableHeader from '../common/tableHeader';

class MoviesTable extends React.Component
{
    columns = [
        { path: 'title', name: 'Title' },
        { path: 'genre.name', name: 'Genre' },
        { path: 'numberInStock', name: 'Stock' },
        { path: 'dailyRentalRate', name: 'Rate' },
        { key: 'like' },
        { key: 'delete' }
    ];
    render() 
    {
        const { movies, onLike, onDelete, onSort, sortColumn } = this.props;
        return (
            <table className="table table-dark table-striped">
                <TableHeader
                    onSort={ onSort }
                    sortColumn={ sortColumn }
                    columns={ this.columns }
                />
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
    }
}

export default MoviesTable;