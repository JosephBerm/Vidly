import React, { Component } from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

const Table = ({ columns, data, onSort, sortColumn }) => {
	return (
		<table className='table table-striped table-dark'>
			<TableHeader
				columns={columns}
				onSort={onSort}
				sortColumn={sortColumn}
			/>
			<TableBody columns={columns} data={data} />
		</table>
	);
};

export default Table;
