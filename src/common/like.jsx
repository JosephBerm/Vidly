const Like = ({ liked, onClick }) => {
	let classes = "fa fa-heart";
	if (!liked) {
		classes += "-o";
	} else {
		classes += " redHeart";
	}

	return (
		<i
			onClick={onClick}
			className={classes + " clickable"}
			aria-hidden='true'
		/>
	);
};

export default Like;
