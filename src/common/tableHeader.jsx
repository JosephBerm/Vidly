import React from 'react';


//sortColumn: obj
//columns: arr
//onSort: func

class TableHeader extends React.Component
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
        return (
            <thead>
                <tr>
                    { this.props.columns.map(column =>
                    (
                        <th
                            key={ column.path || column.key }
                            onClick={ () => (column.path) ? this.callSort(column.path) : null }
                            className={ (column.path) ? 'clickable' : null }
                        >
                            { column.name }
                        </th>
                    )) }
                </tr>
            </thead>
        );
    }
}

export default TableHeader;