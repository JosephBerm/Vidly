import React, { useState, useCallback } from "react";
import useWindowDimensions from "../hooks/useWindowDimensions";

const MouseFollower = () => {
	const { width, height } = useWindowDimensions();
	const circleRadius = 30;
	const initialMousePosition = { x: width / 2, y: height / 2 };
	const [mousePosition, setMousePosition] = useState(initialMousePosition);

	const handleMouseMove = useCallback(
		(event) => {
			const { clientX, clientY } = event;
			setMousePosition({ x: clientX, y: clientY });
		},
		[setMousePosition]
	);

	return (
		<React.Fragment>
			<svg width={width} height={height} onMouseMove={handleMouseMove}>
				<circle cx={mousePosition.x} cy={mousePosition.y} r={circleRadius} />
			</svg>
		</React.Fragment>
	);
};

export default MouseFollower;
