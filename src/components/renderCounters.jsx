import React, { Component } from "react";
import Counters from "./counters";

class RenderCounters extends Component {
	state = {
		counters: [
			{ id: 1, value: 0 },
			{ id: 2, value: 0 },
			{ id: 3, value: 0 },
			{ id: 4, value: 0 },
		],
	};

	// constructor() {
	// 	super();
	// 	console.log("App - Constructor");
	// }

	// componentDidMount() {
	// 	//Ajax call
	// 	console.log("App - Mounted");
	// }

	handleIncrement = (counter) => {
		console.log("Increment Clicked.", counter);
		const counters = [...this.state.counters];
		const index = counters.indexOf(counter);
		counters[index].value++;
		this.setState({ counters });
	};

	handleDecrement = (counter) => {
		console.log("Decrement Clicked.", counter);
		const counters = [...this.state.counters];
		const index = counters.indexOf(counter);
		counters[index].value--;
		this.setState({ counters });
	};

	handleDelete = (counterId) => {
		console.log("Delete Clicked", counterId);
		const counters = this.state.counters.filter((c) => c.id !== counterId);
		this.setState({ counters });
	};

	handleReset = () => {
		console.log("Reset clicked.");
		const counters = this.state.counters.map((c) => {
			c.value = 0;
			return c;
		});
		this.setState({ counters });
	};
	render() {
		let notZero = this.state.counters.filter((c) => c.value !== 0);
		let counter = notZero.length;
		// const notZero = this.state.counters.map((c) =>
		// 	c.value !== 0 ? counter++ : null
		// );
		return (
			<React.Fragment>
				<h1>There Are {counter} Items Selected</h1>
				<Counters
					onReset={this.handleReset}
					onIncrement={this.handleIncrement}
					onDecrement={this.handleDecrement}
					onDelete={this.handleDelete}
					counters={this.state.counters}
				/>
			</React.Fragment>
		);
	}
}

export default RenderCounters;
