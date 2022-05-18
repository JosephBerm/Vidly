import React from "react";

class Counter extends React.Component {
	// componentDidUpdate(prevProps, prevState) {
	// 	console.log("Previous Props", prevProps);
	// 	console.log("Previous State", prevState);
	// }
	// componentWillUnmount() {
	// 	console.log("Counter - Unmount");
	// }

	render() {
		// console.log("Counter - Rendered");
		return (
			<div className='row'>
				<div className='col-2 counter-badge'>
					<span className={this.getBadgeClasses()}>
						{this.formatCounter()}
					</span>
				</div>
				<div className='col'>
					<button
						className='btn btn-success btn-sm'
						onClick={() => this.props.onIncrement(this.props.counter)}>
						+
					</button>
					<button
						className='btn btn-dark btn-sm m-2'
						onClick={() => this.props.onDecrement(this.props.counter)}
						disabled={this.props.counter.value === 0}>
						-
					</button>
					<button
						className='btn btn-danger btn-sm'
						onClick={() => this.props.onDelete(this.props.counter.id)}>
						x
					</button>
				</div>
			</div>
		);
	}

	formatCounter() {
		const { value } = this.props.counter;
		return value === 0 ? "Zero" : value;
	}
	getBadgeClasses() {
		let classes = "badge m-2 bg-";
		classes += this.props.counter.value === 0 ? "warning" : "primary";
		return classes;
	}
}

export default Counter;
