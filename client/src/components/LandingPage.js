import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
	return (
		<Fragment>
			<h3>Landing Page</h3>
			<Link to='/login'>Log In</Link>
			<br />
			<Link to='/register'>Sign Up</Link>
		</Fragment>
	);
};

export default LandingPage;
