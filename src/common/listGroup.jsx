import React from 'react';

const ListGroup = ({ items, onItemSelect, valueProperty, textProperty, selectedItem }) =>
{
    return (
        <ul className="list-group">
            {
                items.map(item => (
                    <li
                        className={ (item === selectedItem)
                            ? 'list-group-item list-group-item-action active clickable'
                            : 'list-group-item list-group-item-action clickable' }
                        key={ item[valueProperty] }
                        onClick={ () => onItemSelect(item) }>
                        { item[textProperty] }
                    </li>
                ))
            }
        </ul>
    );
};

ListGroup.defaultProps =
{
    valueProperty: '_id',
    textProperty: 'name'

};

export default ListGroup;