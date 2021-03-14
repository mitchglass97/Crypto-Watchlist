# About

In this repository I intend to create a Crypto Watchlist web app. Below are mockups that I created in Figma.

![Landing Page](https://user-images.githubusercontent.com/52224377/110902002-cb416f80-82ca-11eb-9972-480ee2dee246.png)

![Login Page](https://user-images.githubusercontent.com/52224377/110894623-cde99800-82bd-11eb-8b3a-b02c25cd0d12.png)

![Home Page](https://user-images.githubusercontent.com/52224377/110894627-d0e48880-82bd-11eb-89dc-50163993afb5.png)

![Home Page (Edit Mode)](https://user-images.githubusercontent.com/52224377/110894630-d17d1f00-82bd-11eb-9461-dd31596bb012.png)

This project will use:

- **PostgreSQL**, database
- **NodeJS** and **Express**, back-end
- **ReactJS**, front-end framework // **React Router DOM**, page routing // **React Toastify**, notifications
- **Bootstrap**, CSS styling
- **jsonwebtoken**, JWT authentication
- **bcrypt**, hashing passwords
- **dotenv**, use .env file in NodeJS
- **nodemon**, dev dependency

The road map for this project currently looks something like:

- [x] get authentication (register/login) working with bcrypt password hashing, backend only
- [x] get authentication (register/login) working with JWT (to persist authentication), backend only
- [x] create a front-end for the register and login pages
- [x] redirect to homepage after logging in. Display username on homepage.
- [ ] display the various errors on login/register page (invalid username/password, username already exists, passwords dont match, etc)
- [ ] set up Watchlist table and test functionality, backend only
- [ ] set up backend routes to GET, POST, and DELETE coins from any given user's watchlist
- [ ] set up homepage front-end: an input for adding a coin to watchlist, and a table displaying all coins on user's watchlist. only allow user to add coins that are supported by Binance. can use [Material-UI's Autocomplete component](https://material-ui.com/components/autocomplete/) in combination with the [Binance API](https://github.com/binance/binance-spot-api-docs/blob/master/rest-api.md) for the coin input
- [ ] add an Edit Watchlist button which puts a "Remove" button next to each coin in the table
- [ ] display price data from Binance API in the table
- [ ] Add an icon for each coin using the [Crypto Icons API](https://cryptoicons.org/)
- [ ] Landing Page

The above would be the core functionality. Ideas to add after are:

- [ ] The ability to click on each coin in watchlist to get a page dedicated to that coin with things like RSS twitter feed for the $CoinSymbol and a graph of the historical coin price

# Setup

This app requires an .env file with the following variables

```
PORT = Port to run the app on (e.g. 5000 for localhost5000)
DB_USER = Postgres username
DB_PASSWORD = Postgres password
DB_HOST = Postgres host (e.g. localhost)
DB_PORT = Postgres port, usually 5432 or 5433
DB_DATABASE = Postgres database
JWT_SECRET_KEY = Secret key used to sign JWT tokens. Can be any arbitrary string.
```
