CREATE DATABASE crypto_watchlist_database;

CREATE TABLE users( 
    user_id SERIAL PRIMARY KEY NOT NULL,
    user_name VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL
);

-- example insert command 
INSERT INTO users(user_name, user_password) VALUES('bobyhey', 'welcome123');

CREATE TABLE watchlist( 
    id SERIAL PRIMARY KEY NOT NULL,
    user_name VARCHAR(255) NOT NULL,
    coin_name VARCHAR(20) NOT NULL
);

-- example insert command 
INSERT INTO watchlist(user_name, coin_name) VALUES('bobyhey', 'NANO');

-- example command to get a user's watchlist
SELECT coin_name
FROM watchlist
WHERE user_name = 'bobyhey';

-- example command to delete coin from watchlist
DELETE FROM watchlist
WHERE user_name = '5' AND coin_name = 'NANO'
RETURNING *;
