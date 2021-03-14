// Dashboard Route

// Imports
const router = require("express").Router();
const pool = require("../database/db");
const authorization = require("../middleware/authorization");

// Return user_id. just as a test. later this will return the user's watchlist
router.get("/", authorization, async (req, res) => {
	try {
		const { user } = req;

		// Check if username exists
		const userID = await pool.query("SELECT user_name FROM users WHERE user_name = $1;", [user]);
		if (userID.rows.length == 0) {
			return res.status(401).send("Username does not exist");
		}
		res.json(userID.rows[0]);
	} catch (error) {
		console.log(error);
		res.status(500).send("Server Error");
	}
});

module.exports = router;
