// Middleware for verifying JWT token using jsonwebtoken.verify

const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = async (req, res, next) => {
	try {
		// Check for a JWT Token
		const jwtToken = req.header("token");

		if (!jwtToken || jwtToken == "undefined") {
			return res.status(403).json("NOT AUTHORIZED");
		}

		// If there is a token, verify the token
		const payload = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);

		req.user = payload.user;
	} catch (error) {
		console.log(error);
		return res.status(403).json("NOT AUTHORIZED");
	}

	next();
};
