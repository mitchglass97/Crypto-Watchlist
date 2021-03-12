const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

// Middleware
app.use(express.json()); // gives access to req.body
app.use(cors());

// Start server by listening on a designated port
const port = process.env.PORT;
app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});

// ROUTES //

// Register and Login

app.use("/auth", require("./routes/jwtAuth"));
