import React, { Fragment, useEffect, useState } from "react";

const Dashboard = ({ setAuth }) => {
	const [username, setUsername] = useState("");

	useEffect(() => {
		fetchUsername();
	}, []);

	const fetchUsername = async () => {
		const fetchDashboard = await fetch("http://localhost:5000/dashboard", {
			method: "GET",
			headers: { token: localStorage.token },
		});
		const parseResponse = await fetchDashboard.json();
		setUsername(parseResponse.user_name);
	};

	const logout = (e) => {
		e.preventDefault();
		localStorage.removeItem("token");
		setAuth(false);
	};

	return (
		<Fragment>
			<h3>Dashboard</h3>
			<p>hello {username}</p>
			<button className='btn btn-primary' onClick={(e) => logout(e)}>
				Logout
			</button>
		</Fragment>
	);
};

export default Dashboard;
