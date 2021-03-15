// Dashboard Route

// Imports
const router = require("express").Router();
const pool = require("../database/db");
const authorization = require("../middleware/authorization");
const validCoin = require("../middleware/validCoin");

// Return user_id. just as a test. later this will return the user's watchlist
router.get("/watchlist", authorization, async (req, res) => {
	try {
		const { user } = req;

		// Check if username exists
		const userID = await pool.query("SELECT coin_name FROM watchlist WHERE user_name = $1;", [user]);
		console.log(userID.rows);
		res.json(userID.rows);
	} catch (error) {
		console.log(error);
		res.status(500).send("Server Error");
	}
});

// Return user_id. just as a test. later this will return the user's watchlist
router.get("/username", authorization, async (req, res) => {
	try {
		const { user } = req;
		res.json(user);
	} catch (error) {
		console.log(error);
		res.status(500).send("Server Error");
	}
});

// Add coin
router.post("/addcoin", authorization, validCoin, async (req, res) => {
	try {
		const { coinName } = req.body;
		const { user } = req;

		// Add coin to Watchlist table
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

// Delete coin
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
