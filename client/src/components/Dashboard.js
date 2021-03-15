import React, { Fragment, useEffect, useState } from "react";

const Dashboard = ({ setAuth }) => {
	const [watchlist, setWatchlist] = useState([]);
	const [watchlistLoaded, setWatchlistLoaded] = useState(false);
	const [username, setUsername] = useState("");
	const [coinName, setCoinName] = useState("");

	// Fetch the watchlist from server on page load
	useEffect(() => {
		fetchWatchlist();
		fetchUsername();
	}, []);

	// Once watchlist has been loaded, set a boolean variable to true.
	// Using conditional render, don't display the watchlist on the page
	// until the boolean is true.
	useEffect(() => {
		try {
			if (watchlist[0].coin_name != "undefined") {
				setWatchlistLoaded(true);
			}
		} catch (error) {
			console.log("Fetching watchlist...");
		}
	}, [watchlist]);

	// Fetch watchlist from server
	const fetchWatchlist = async () => {
		const response = await fetch("http://localhost:5000/dashboard/watchlist", {
			method: "GET",
			headers: { token: localStorage.token },
		});
		const parseResponse = await response.json();
		setWatchlist(parseResponse);
	};

	// Fetch username from server
	const fetchUsername = async () => {
		const response = await fetch("http://localhost:5000/dashboard/username", {
			method: "GET",
			headers: { token: localStorage.token },
		});
		const parseResponse = await response.json();
		setUsername(parseResponse);
	};

	// When user types into "Search for a coin" input
	const onChangeForm = (e) => {
		setCoinName(e.target.value);
	};

	// When user submits Add a Coin form
	// Possible errors: coin name not supported by binance, coin already in list
	const onSubmitForm = async (e) => {
		e.preventDefault();
		const body = { coinName };
		const addCoin = await fetch("http://localhost:5000/dashboard/addcoin", {
			method: "POST",
			headers: { "Content-Type": "application/json", token: localStorage.token },
			body: JSON.stringify(body),
		});
		const parseResponse = await addCoin.json();
		fetchWatchlist();
	};

	// Delete coin from watchlist
	const deleteCoinFromWatchlist = async (idx) => {
		const coinToDelete = watchlist[idx].coin_name;
		const body = { coinName: coinToDelete };

		const deleteCoin = await fetch("http://localhost:5000/dashboard/deletecoin", {
			method: "POST",
			headers: { "Content-Type": "application/json", token: localStorage.token },
			body: JSON.stringify(body),
		});
		const parseResponse = await deleteCoin.json();
		fetchWatchlist();
	};

	// Logout button
	const logout = (e) => {
		e.preventDefault();
		localStorage.removeItem("token");
		setAuth(false);
	};

	return (
		<Fragment>
			<h3>Dashboard</h3>
			<p>hello {username}!</p>
			<form onSubmit={onSubmitForm}>
				<input
					type='text'
					name='coinName'
					placeholder='Search for a coin'
					className='form-control my-3'
					value={coinName}
					onChange={(e) => onChangeForm(e)}
				></input>
				<button className='btn btn-success btn-block form-control my-3'>
					Add Coin to Watchlist
				</button>
			</form>
			<button className='btn btn-primary' onClick={(e) => logout(e)}>
				Logout
			</button>
			<table className='table'>
				<thead>
					<tr>
						<th scope='col'>Coin Name</th>
						<th scope='col'>Coin Price</th>
						<th scope='col'>Change($)</th>
						<th scope='col'>Change(%)</th>
						<th scope='col'>Action</th>
					</tr>
				</thead>
				<tbody>
					{watchlistLoaded == true &&
						watchlist.map((val, idx) => {
							return (
								<tr key={idx}>
									<th scope='row'>{watchlist[idx].coin_name}</th>
									<td></td>
									<td></td>
									<td></td>
									<td>
										<button
											className='btn btn-danger'
											onClick={() =>
												deleteCoinFromWatchlist(
													idx
												)
											}
										>
											Remove
										</button>
									</td>
								</tr>
							);
						})}
				</tbody>
			</table>
		</Fragment>
	);
};

export default Dashboard;