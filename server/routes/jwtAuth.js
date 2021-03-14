// Register, Login and Verify JWT Routes

// Imports
const router = require("express").Router(); // for creating modular Express routes
const pool = require("../database/db"); // Used to connect to our PostgreSQL database
const bcrypt = require("bcrypt"); // Used to hash passwords
const jwtGenerator = require("../utils/jwtGenerator"); // Used to generate JWT tokens
const validInfo = require("../middleware/validinfo");
const authorization = require("../middleware/authorization");

// Register
router.post("/register", validInfo, async (req, res) => {
	try {
		const { username, password } = req.body;

		// Check if username exists
		const user = await pool.query("SELECT * FROM users WHERE user_name = $1;", [username]);
		if (user.rows.length !== 0) {
			return res.status(401).send("Username already exists");
		}

		// Hash password with bcrypt
		const saltRounds = 10;

		bcrypt.genSalt(saltRounds, function (err, salt) {
			bcrypt.hash(password, salt, async function (err, hash) {
				// Insert hash into database
				const registerUser = await pool.query("INSERT INTO users(user_name, user_password) VALUES($1, $2) RETURNING *;", [
					username,
					hash,
				]);

				// Generate and send a JWT token
				const token = jwtGenerator(registerUser.rows[0].user_name);
				return res.json({ token });
			});
		});
	} catch (error) {
		console.log(error);
		res.status(500).send("Server Error");
	}
});

// Login
router.post("/login", validInfo, async (req, res) => {
	try {
		const { username, password } = req.body;

		// Check if username exists
		const user = await pool.query("SELECT * FROM users WHERE user_name = $1;", [username]);
		if (user.rows.length == 0) {
			return res.status(401).send("Username does not exist");
		}

		// Use bcrypt to compare the password from user with the password hash stored in the database
		const passwordHash = await pool.query("SELECT user_password FROM users WHERE user_name = $1;", [username]);

		bcrypt.compare(password, passwordHash.rows[0].user_password, function (err, result) {
			if (!result) {
				return res.status(401).send("Password does not match");
			} else {
				// Password matches, so generate and send a JWT token
				const token = jwtGenerator(user.rows[0].user_name);
				return res.json({ token });
			}
		});
	} catch (error) {
		console.log(error);
		res.status(500).send("Server Error");
	}
});

// Verify JWT Token
router.get("/is-verify", authorization, async (req, res) => {
	try {
		res.json(true);
	} catch (error) {
		console.log(error);
		res.status(500).send("Server Error");
	}
});

module.exports = router;
