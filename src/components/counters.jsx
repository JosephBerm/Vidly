import React from "react";
import Counter from "./counter";

class Counters extends React.Component {
	render() {
		// console.log("Counters - Rendered");
		const { onReset, onDelete, onIncrement, onDecrement, counters } =
			this.props;
		return (
			<React.Fragment>
				<button onClick={onReset} className='btn btn-primary btn-sm m-2'>
					Reset
				</button>
				{counters.map((counter) => (
					<Counter
						key={counter.id}
						onDelete={onDelete}
						onIncrement={onIncrement}
						onDecrement={onDecrement}
						counter={counter}
					/>
				))}
			</React.Fragment>
		);
	}
}

export default Counters;
