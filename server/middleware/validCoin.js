// Middleware for verifying that a coin is valid. Has to meet 2 requirements
// 1) can't already be in user's watchlist (no duplicates)
// 2) has to be supported in binance API

// Imports
const router = require("express").Router();
const pool = require("../database/db");
const fetch = require("node-fetch");

module.exports = async function (req, res, next) {
	const { coinName } = req.body;
	const { user } = req;

	// Check if coin is in Binance API
	fetch(`https://api.binance.com/api/v1/exchangeInfo`)
		.then((res) => res.json())
		.then(async (json) => {
			const coinsSupportedOnBinance = [];
			for (let i = 0; i < json.symbols.length; i++) {
				coinsSupportedOnBinance[i] = json.symbols[i].baseAsset;
			}
			if (!coinsSupportedOnBinance.includes(coinName.toUpperCase())) {
				return res.status(401).json({ message: "Coin not supported by Binance", error: "001" });
			} else {
				// If coin is supported by Binance, check if coin is already in user's watchlist
				const checkWatchlistForDuplicate = await pool.query(
					"SELECT coin_name from watchlist WHERE user_name = $1",
					[user]
				);

				for (elt in checkWatchlistForDuplicate.rows) {
					if (checkWatchlistForDuplicate.rows[elt].coin_name == coinName) {
						return res
							.status(401)
							.json({ message: "Coin already in watchlist", error: "002" });
					}
				}
				next();
			}
		});
};
