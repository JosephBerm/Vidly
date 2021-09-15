import React from 'react';
import Like from '../common/like';
import Table from '../common/table';
class MoviesTable extends React.Component
{
    columns = [
        { path: 'title', name: 'Title' },
        { path: 'genre.name', name: 'Genre' },
        { path: 'numberInStock', name: 'Stock' },
        { path: 'dailyRentalRate', name: 'Rate' },
        {
            key: 'like',
            content: movie => (
                <Like
                    onClick={ () => this.props.onLike(movie) }
                    liked={ movie.liked } />
            )
        },
        {
            key: 'delete',
            content: movie => (
                <button
                    onClick={ () => this.props.onDelete(movie) }
                    className="btn btn-danger">
                    Delete
                </button>
            )
        }
    ];
    render() 
    {
        const { movies, onSort, sortColumn } = this.props;
        return (
            <Table
                onSort={ onSort }
                sortColumn={ sortColumn }
                columns={ this.columns }
                data={ movies }
            />
        );
    }
}

export default MoviesTable;