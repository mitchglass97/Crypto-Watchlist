import React, { Fragment, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Dashboard = ({ setAuth }) => {
	const [watchlist, setWatchlist] = useState([]);
	const [watchlistLoaded, setWatchlistLoaded] = useState(false);
	const [username, setUsername] = useState("");
	const [coinName, setCoinName] = useState("");
	const [editMode, setEditMode] = useState(false);

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
			console.log("Fetching watchlist & prices...");
			// can put loader stuff here
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
		setCoinName(e.target.value.toUpperCase());
	};

	const editButton = (e) => {
		setEditMode(!editMode);
	};

	// When user submits Add a Coin form
	// Possible errors: coin name not supported by binance, coin already in list
	const addCoinButton = async (e) => {
		e.preventDefault();
		const body = { coinName };
		const addCoin = await fetch("http://localhost:5000/dashboard/addcoin", {
			method: "POST",
			headers: { "Content-Type": "application/json", token: localStorage.token },
			body: JSON.stringify(body),
		});
		const parseResponse = await addCoin.json();
		if (parseResponse.error == "001") {
			toast.error("Error: Invalid coin name or coin not supported by the Binance API.", {
				pauseOnHover: false,
			});
			return;
		} else if (parseResponse.error == "002") {
			toast.error(`Error: $${coinName} is already on your watchlist.`, { pauseOnHover: false });
			return;
		} else {
			fetchWatchlist(); // no Errors
			setCoinName("");
		}
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

	let editButtonText = "";
	if (!editMode) {
		editButtonText = "Edit Watchlist";
	} else {
		editButtonText = "Finish Editing";
	}

	return (
		<Fragment>
			<div
				className='container d-flex flex-column justify-content-center align-items-center'
				id='dashboard-container'
			>
				<form onSubmit={addCoinButton} className='d-flex mb-3' id='coin-input-form'>
					<input
						type='text'
						name='coinName'
						placeholder='Search for a coin'
						className='form-control my-3 w-75 mr-4'
						value={coinName}
						onChange={(e) => onChangeForm(e)}
					></input>
					<button
						className='btn btn-light btn-block form-control my-3 w-25'
						id='dashboard-add-button'
					>
						Add
					</button>
				</form>
				<button className='btn btn-primary' onClick={(e) => editButton(e)}>
					{editButtonText}
				</button>
				<div className='table-responsive-md'>
					<table className='table' id='dashboard-table'>
						<thead>
							<tr>
								<th scope='col'>Coin Name</th>
								<th scope='col'>Price</th>
								<th scope='col'>Change($)</th>
								<th scope='col'>Change(%)</th>
								{editMode && <th scope='col'>Remove</th>}
							</tr>
						</thead>
						<tbody>
							{watchlistLoaded &&
								watchlist.map((val, idx) => {
									return (
										<tr key={idx}>
											<td scope='row'>
												{
													watchlist[idx]
														.coin_name
												}
											</td>
											<td>
												$ {watchlist[idx].price}
											</td>
											<td>
												${" "}
												{
													watchlist[idx]
														.priceChange
												}
											</td>
											<td>
												{
													watchlist[idx]
														.priceChangePercent
												}{" "}
												%
											</td>
											{editMode && (
												<td>
													<button
														className='btn btn-danger'
														onClick={() =>
															deleteCoinFromWatchlist(
																idx
															)
														}
													>
														X
													</button>
												</td>
											)}
										</tr>
									);
								})}
						</tbody>
					</table>
				</div>
			</div>
		</Fragment>
	);
};

export default Dashboard;
