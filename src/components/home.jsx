import React, { Component, useState } from "react";

class Home extends Component {
	state = {
		time: ["1m", "5m", "15m"],
		selected: "",
	};

	updateSelected = (itemSelected) => {
		this.setState({ selected: itemSelected });
	};

	render() {
		const { time, selected } = this.state;
		return (
			<React.Fragment>
				<DropDown
					data={time}
					selected={selected}
					placeHolder={"Time"}
					updateSelected={this.updateSelected}
				/>
			</React.Fragment>
		);
	}
}
export default Home;

const DropDown = ({ data, selected, placeHolder, updateSelected }) => {
	const [click, setClick] = useState(false);

	const handleClick = () => {
		setClick(!click);
	};

	return (
		<React.Fragment>
			<div className='dropDown-container clickable' onClick={handleClick}>
				{selected || placeHolder}
			</div>
			{click &&
				data.map((d) => (
					<div
						key={d}
						className='dropDown-item clickable'
						onClick={() => {
							updateSelected(d);
							setClick(false);
						}}>
						{d}
					</div>
				))}
		</React.Fragment>
	);
};
