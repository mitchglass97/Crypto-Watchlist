const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config(); // gives access to .env variables

// Middleware
app.use(express.json()); // gives access to req.body
app.use(cors());

// ROUTES //

// Register and Login Routes
app.use("/auth", require("./routes/jwtAuth"));

// Dashboard Route
app.use("/dashboard", require("./routes/dashboard"));

// Start server by listening on a designated port
const port = process.env.PORT;
app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});
