# About

In this repository I intend to create a Crypto Watchlist web app. Below are two mockups that I have created in Figma.

![Crypto Watchlist 1](https://user-images.githubusercontent.com/52224377/110876967-27da6580-829e-11eb-88b3-d73aa40746f7.PNG)

![Crypto Watchlist 2](https://user-images.githubusercontent.com/52224377/110876983-3032a080-829e-11eb-9465-4808bd9171bb.PNG)

The road map for this app will look something like:

- Set up boilerplate backend and SQL database
     - Database will include two tables:
          - User table will store all users (schema: username, their hashed password, and a unique userId)
          - Watchlist table will be a table of all coins in users' watchlist (schema: coin name, the associated userId)
- Create Register/Login pages
     - On Register, send a POST request to add account to SQL database (if the account/username does not exist already)
     - On Login, send a GET request to determine whether the username exists.
          - If the username exists, check if the password matches. The password will be hashed using a cryptographic algorithm such as Argon2.
- Create Home page with a table of coins (user's watchlist)
     - On page load, make a GET request to the Watchlist table in SQL database to get all the coin names in the Watchlist that match the userId of the logged-in user
     - Create input fields to search for and add a coin to table.
     - The coin price information will be obtained from the Binance API.
     - Make the table will be editable, meaning users can Add and Remove coins from their watchlist.
     - Adding a coin will send a POST request to add an entry to the Watchlist table with the inputted coin name and userId. Duplicate
     - Removing a coin will send a DELETE request to the database to delete the Watchlist entry that matches the coin name and userId)

The above would be the core functionality. Ideas to add after are:

- The ability to click on each coin in watchlist to get a page dedicated to that coin with things like:
     - An RSS twitter feed for the $CoinSymbol
     - Graph of the coin price over time
