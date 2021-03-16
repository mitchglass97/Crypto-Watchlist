// Middleware for verifying JWT token using jsonwebtoken.verify

const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = async (req, res, next) => {
	try {
		// Check for a JWT Token
		const jwtToken = req.header("token");

		console.log(jwtToken);
		if (!jwtToken || jwtToken == "undefined") {
			console.log("no token");
			return res.status(403).json("NOT AUTHORIZED");
		}

		console.log("yes token");

		// If there is a token, verify the token
		const payload = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);

		req.user = payload.user;
	} catch (error) {
		console.log(error);
		return res.status(403).json("NOT AUTHORIZED");
	}

	next();
};
