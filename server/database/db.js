// Set up Pool connection to PostgreSQL database

const { Pool } = require("pg");
var pool;

if (typeof process.env.DATABASE_URL == "undefined") {
	// running locally
	console.log("database connected locally");
	pool = new Pool({
		user: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		host: process.env.DB_HOST,
		port: process.env.DB_PORT,
		database: process.env.DB_DATABASE,
	});
} else {
	// running in Heroku
	console.log("database connected to Heroku");
	pool = new Pool({
		connectionString: process.env.DATABASE_URL,
		ssl: {
			rejectUnauthorized: false,
		},
	});
}

module.exports = pool;
