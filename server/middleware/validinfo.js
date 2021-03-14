// Middleware that verifies that username and password strings are not empty

module.exports = function (req, res, next) {
	const { username, password } = req.body;

	if (req.path === "/register") {
		if (![username, password].every(Boolean)) {
			console.log("missing credentials! middleware ending request");
			return res.status(401).json("Missing credentials");
		}
	} else if (req.path === "/login") {
		if (![username, password].every(Boolean)) {
			console.log("missing credentials! middleware ending request");
			return res.status(401).json("Missing credentials");
		}
	}

	next();
};
