// Dashboard Route

// Imports
const router = require("express").Router();
const pool = require("../database/db");
const authorization = require("../middleware/authorization");
const validCoin = require("../middleware/validCoin");
const fetch = require("node-fetch");

// Return all coins in user's watchlist
router.get("/watchlist", authorization, async (req, res) => {
	try {
		// Get all coins in watchlist
		const { user } = req;
		const watchlistCoins = await pool.query("SELECT coin_name FROM watchlist WHERE user_name = $1;", [
			user,
		]);

		// For each coin, get price from Binance API
		let stringAPI = "";
		let payload = [];
		let temp = {};
		for (elt in watchlistCoins.rows) {
			stringAPI =
				"https://api.binance.us/api/v3/ticker/24hr?symbol=" +
				watchlistCoins.rows[elt].coin_name +
				"USD";
			response = await fetch(stringAPI);
			response = await response.json();
			price = parseFloat(response.lastPrice).toFixed(2);
			priceChange = parseFloat(response.priceChange).toFixed(2);
			priceChangePercent = parseFloat(response.priceChangePercent).toFixed(2);

			temp = {
				coin_name: watchlistCoins.rows[elt].coin_name,
				price: price,
				priceChange: priceChange,
				priceChangePercent,
				priceChangePercent,
			};

			payload = payload.concat(temp);
		}
		console.log(payload);
		res.json(payload);
	} catch (error) {
		console.log(error);
		res.status(500).send("Server Error");
	}
});

// Return username
router.get("/username", authorization, async (req, res) => {
	try {
		const { user } = req;
		res.json(user);
	} catch (error) {
		console.log(error);
		res.status(500).send("Server Error");
	}
});

// Add coin to watchlist
router.post("/addcoin", authorization, validCoin, async (req, res) => {
	try {
		const { coinName } = req.body;
		const { user } = req;

		const addCoinToWatchlist = await pool.query(
			"INSERT INTO watchlist(user_name, coin_name) VALUES($1, $2) RETURNING *;",
			[user, coinName]
		);

		res.json(addCoinToWatchlist.rows);
	} catch (error) {
		console.log(error);
		res.status(500).send("Server Error");
	}
});

// Delete coin from watchlist
router.post("/deletecoin", authorization, async (req, res) => {
	try {
		const { coinName } = req.body;
		const { user } = req;

		// Delete coin from Watchlist table
		const deleteCoinFromWatchlist = await pool.query(
			"DELETE FROM watchlist WHERE user_name = $1 AND coin_name = $2 RETURNING *;",
			[user, coinName]
		);

		res.json(deleteCoinFromWatchlist.rows);
	} catch (error) {
		console.log(error);
		res.status(500).send("Server Error");
	}
});

module.exports = router;
