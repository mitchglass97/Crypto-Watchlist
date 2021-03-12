const router = require("express").Router();
const pool = require("../database/db");
const bcrypt = require("bcrypt");

// Register
router.post("/register", async (req, res) => {
	try {
		const { username, password } = req.body;
		let passwordHash = "";

		// Check if username exists
		const user = await pool.query(
			"SELECT * FROM users WHERE user_name = $1;",
			[username]
		);

		if (user.rows.length !== 0) {
			return res.status(401).send("Username already exists");
		}

		// Hash password with bcrypt
		const saltRounds = 10;

		bcrypt.genSalt(saltRounds, function (err, salt) {
			bcrypt.hash(password, salt, async function (err, hash) {
				// Insert hash into database
				const registerUser = await pool.query(
					"INSERT INTO users(user_name, user_password) VALUES($1, $2) RETURNING *;",
					[username, hash]
				);

				return res.send(
					"Account successfully registered"
				);
			});
		});

		// Generate JWT token
	} catch (error) {
		console.log(error);
		res.status(500).send("Server Error");
	}
});

// Login
router.post("/login", async (req, res) => {
	try {
		const { username, password } = req.body;

		// Check if username exists
		const user = await pool.query(
			"SELECT * FROM users WHERE user_name = $1;",
			[username]
		);

		if (user.rows.length == 0) {
			return res.status(401).send("Username does not exist");
		}

		// Compare password to stored password hash using Bcrypt
		const passwordHash = await pool.query(
			"SELECT user_password FROM users WHERE user_name = $1;",
			[username]
		);

		bcrypt.compare(
			password,
			passwordHash.rows[0].user_password,
			function (err, result) {
				if (!result) {
					return res
						.status(401)
						.send(
							"Password does not match"
						);
				} else {
					return res.send("Password matches");
				}
			}
		);

		// Generate JWT token
	} catch (error) {
		console.log(error);
		res.status(500).send("Server Error");
	}
});

module.exports = router;
