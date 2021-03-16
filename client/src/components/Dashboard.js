import React, { Fragment, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Dashboard = ({ setAuth }) => {
	const baseURL = process.env.REACT_APP_BASE_URL;

	const [watchlist, setWatchlist] = useState("undefined");
	const [watchlistLoaded, setWatchlistLoaded] = useState(false);
	const [watchlistEmpty, setWatchlistEmpty] = useState(false);
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
			if (watchlist != "undefined") {
				console.log(watchlist);
				setWatchlistLoaded(true);
				if (watchlist.length == 0) {
					setWatchlistEmpty(true);
				} else {
					setWatchlistEmpty(false);
				}
			} else {
				setWatchlistLoaded(false);
				setWatchlistEmpty(false);
			}
		} catch (error) {
			console.log("Fetching watchlist & prices...");
			console.log(error);
			// can put loader stuff here
		}
	}, [watchlist]);

	// Fetch watchlist from server
	const fetchWatchlist = async () => {
		const response = await fetch(baseURL + "/dashboard/watchlist", {
			method: "GET",
			headers: { token: localStorage.token },
		});
		const parseResponse = await response.json();
		let test = await setWatchlist(parseResponse);
		//console.log(watchlist);
	};

	// Fetch username from server
	const fetchUsername = async () => {
		const response = await fetch(baseURL + "/dashboard/username", {
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
		const addCoin = await fetch(baseURL + "/dashboard/addcoin", {
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

		const deleteCoin = await fetch(baseURL + "/dashboard/deletecoin", {
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

	const getClass = (props) => {
		if (props.priceChange > 0) {
			return "green";
		} else if (props.priceChange < 0) {
			return "red";
		}
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
												<span
													className={getClass(
														watchlist[
															idx
														]
													)}
												>
													{
														watchlist[
															idx
														]
															.priceChange
													}
												</span>
											</td>
											<td>
												<span
													className={getClass(
														watchlist[
															idx
														]
													)}
												>
													{
														watchlist[
															idx
														]
															.priceChangePercent
													}{" "}
													%
												</span>
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
							{!watchlistLoaded && (
								<tr>
									<td>
										<div
											className='spinner-border text-dark'
											role='status'
										>
											<span className='sr-only'>
												Loading...
											</span>
										</div>
									</td>
									<td>
										<div
											className='spinner-border text-dark'
											role='status'
										>
											<span className='sr-only'>
												Loading...
											</span>
										</div>
									</td>
									<td>
										<div
											className='spinner-border text-dark'
											role='status'
										>
											<span className='sr-only'>
												Loading...
											</span>
										</div>
									</td>
									<td>
										<div
											className='spinner-border text-dark'
											role='status'
										>
											<span className='sr-only'>
												Loading...
											</span>
										</div>
									</td>
								</tr>
							)}
							{watchlistEmpty && (
								<tr>
									<td className='grey-text'>
										Your watchlist is empty. Try adding a
										coin!
									</td>
									<td></td>
									<td></td>
									<td></td>
								</tr>
							)}
						</tbody>
					</table>
				</div>
			</div>
		</Fragment>
	);
};

export default Dashboard;
