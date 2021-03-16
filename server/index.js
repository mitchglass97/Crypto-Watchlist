// Main file for the NodeJS/Express server
//
// The server handles:
// 1) Adding a new user to the User table (adds username and
// a password hash, hashed using Bcrypt). Will not register a user
// if the username already exists
//
// 2) Logging a user in (compares password to password hash stored in
// database). both register and login routes will provide a signed JWT token
// (signed using JSONWebtoken package)
//
// 3) is-verify route returns true if user's JWT Token is valid
//
// 4) Dashboard route returns all coins in the logged-in user's watchlist

const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
require("dotenv").config(); // gives access to .env variables

// Middleware
app.use(express.json()); // gives access to req.body
app.use(cors());

// ROUTES //

// Register and Login Routes
app.use("/auth", require("./routes/jwtAuth"));

// Dashboard Route
app.use("/dashboard", require("./routes/dashboard"));

// Heroku
if (process.env.NODE_ENV === "production") {
	app.use(express.static("../client/build"));

	app.get("*", function (req, res) {
		res.sendFile(path.resolve("/app/client/build/index.html"));
	});
}

// Start server by listening on a designated port
const port = process.env.PORT;
app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});
