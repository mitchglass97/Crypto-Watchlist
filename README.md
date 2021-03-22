**_(Note: typetypetype is hosted in Heroku on a free account, so if you visit the site it may take up to 20 seconds for the app to spin up)_**

# Welcome

![Landing Page](https://user-images.githubusercontent.com/52224377/110902002-cb416f80-82ca-11eb-9972-480ee2dee246.png)

[Live Link](https://crypto-watchlist.herokuapp.com/)

Crypto Watchlist is a full-stack web app where users can create and edit a watchlist of cryptos.

The price and change in price of each crypto is displayed on a table on the dashboard.

Each user's watchlist is linked to their account so it will display and persist on any device.

This app is currently deployed in Heroku but can be ran locally as well. Please see the Setup section below for more info.

This project uses:

- **PostgreSQL**, database
- **NodeJS** and **Express**, back-end
- **ReactJS**, front-end framework // **React Router DOM**, page routing // **React Toastify**, notifications
- **Bootstrap**, CSS styling
- **jsonwebtoken**, JWT authentication
- **bcrypt**, hashing passwords,
- **node-fetch**, making fetch requests on node server
- **dotenv**, use .env file in NodeJS
- **nodemon**, dev dependency

The road map for this project currently looks something like:

- [x] get authentication (register/login) working with bcrypt password hashing, backend only
- [x] get authentication (register/login) working with JWT (to persist authentication), backend only
- [x] create basic front-end for the landing, register, login, dashboard pages
- [x] redirect to homepage after logging in. Display username on homepage.
- [x] display the various errors with react-toastify (invalid password, username already exists when registering, invalid coin name, coin already on watchlist)
- [x] set up Watchlist table and test functionality, backend only
- [x] set up backend routes to GET, POST, and DELETE coins from any given user's watchlist
- [x] set up homepage front-end: an input for adding a coin to watchlist, and a table displaying all coins on user's watchlist. only allow user to add coins that are supported by Binance.
- [x] add a "Remove" button next to each coin in the table
- [x] add an Edit Watchlist button which toggles the table column with the "Remove" buttons
- [x] display price data from Binance API in the table
- [x] make it all look nice (bare-bones CSS up until this point)
- [ ] make the coin input a [Material-UI Autocomplete component](https://material-ui.com/components/autocomplete/)
- [x] set color of table entries for price change and percent change based on positive or negative (green or red?)
- [x] Landing Page

The above is the core functionality. Ideas to add after are:

- [ ] The ability to click on each coin in watchlist to get a page dedicated to that coin with things like RSS twitter feed for the $CoinSymbol and a graph of the historical coin price
- [ ] Add an icon for each coin using the [Crypto Icons API](https://cryptoicons.org/)

# About

The structure of the PostgreSQL database (user_password is a password hash generated using bcrypt):

![Database](https://user-images.githubusercontent.com/52224377/111240786-e31a3b80-85c9-11eb-9c29-30bf8dbeac87.PNG)

# Setup

## Running Locally

Running locally requires two .env files.

The first .env file must be in the server folder and must contain the following variables:

```
PORT = Port to run the app on (e.g. 5000 for localhost5000)
DB_USER = Postgres username
DB_PASSWORD = Postgres password
DB_HOST = Postgres host (e.g. localhost)
DB_PORT = Postgres port, usually 5432 or 5433
DB_DATABASE = Postgres database
JWT_SECRET_KEY = Key used to generate JWT token. Can be any arbitrary string
```

The second .env file must be in the client folder and must contain the following variables:

```
REACT_APP_BASE_URL = e.g. http://localhost:5000
```

To run the project locally:

In the main folder, run

```
npm install // first-time setup
```

In the server folder, run one of the following commands:

```
npm start // production
npm run dev // development or testing
```

Then, in the client folder, run

```
npm start
```

## Deploying to Heroku

Running in Heroku requires the following Config Vars to be set up:

```
JWT_SECRET_KEY = Key used to generate JWT token. Can be any arbitrary string
NODE_ENV = production (must be set exactly to the string "production")
REACT_APP_BASE_URL = e.g https://crypto-watchlist.herokuapp.com
```

Additionally, a Heroku Postgres database must be added to the Heroku app and following two tables must be created:

```
CREATE TABLE users(
    user_id SERIAL PRIMARY KEY NOT NULL,
    user_name VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL
);

CREATE TABLE watchlist(
    id SERIAL PRIMARY KEY NOT NULL,
    user_name VARCHAR(255) NOT NULL,
    coin_name VARCHAR(20) NOT NULL
);
```
