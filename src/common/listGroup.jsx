import React, { Component } from "react";
const ListGroup = ({
	items,
	selectedItem,
	onItemSelect,
	itemId,
	itemName,
}) => {
	return (
		<ul className='list-group'>
			{items.map((item) => (
				<li
					key={item[itemId]}
					onClick={() => onItemSelect(item)}
					className={
						selectedItem === item
							? "list-group-item active magnify clickable"
							: "list-group-item magnify clickable"
					}>
					{item[itemName]}
				</li>
			))}
		</ul>
	);
};

ListGroup.defaultProps = {
	itemName: "name",
	itemId: "_id",
};

export default ListGroup;
