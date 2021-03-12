CREATE DATABASE crypto_watchlist_database;

CREATE TABLE users( 
    user_id SERIAL PRIMARY KEY NOT NULL,
    user_name VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL
);

INSERT INTO users(user_name, user_password) VALUES('bobyhey', 'welcome123');