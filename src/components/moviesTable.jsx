import React from 'react';
import Like from '../common/like';

class MoviesTable extends React.Component
{
    callSort = (path) =>
    {
        console.log('Sorting -', path);
        const sortColumn = { ...this.props.sortColumn };
        if (sortColumn.path === path)
        {
            sortColumn.order = (sortColumn.order === 'asc') ? 'desc' : 'asc';
        }
        else
        {
            sortColumn.path = path;
            sortColumn.order = 'asc';
        }
        this.props.onSort(sortColumn);
    };
    render() 
    {
        const { movies, onLike, onDelete } = this.props;
        return (
            <table className="table table-dark table-striped">
                <thead>
                    <tr>
                        <th
                            style={ { cursor: 'pointer' } }
                            onClick={ () => this.callSort('title') }>
                            Title
                        </th>
                        <th
                            style={ { cursor: 'pointer' } }
                            onClick={ () => this.callSort('genre.name') }>
                            Genre
                        </th>
                        <th
                            style={ { cursor: 'pointer' } }
                            onClick={ () => this.callSort('numberInStock') }>
                            Stock
                        </th>
                        <th
                            style={ { cursor: 'pointer' } }
                            onClick={ () => this.callSort('dailyRentalRate') }>
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
    }
}

export default MoviesTable;