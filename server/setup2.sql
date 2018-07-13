DROP DATABASE eatistay;
CREATE DATABASE eatistay;
USE eatistay;

CREATE TABLE users(
	userid INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    email varchar(255) NOT NULL,
	username varchar(255) NOT NULL,
	password varchar(255) NOT NULL,
	user_type varchar(1) NOT NULL CHECK(user_type = 'c' OR user_type = 'o')
);

CREATE TABLE restaurants(
	restaurant_id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
	restaurant_name varchar(255) NOT NULL,
	restaurant_description text NOT NULL,
    restaurant_location varchar(255) NOT NULL,
	owner_id int,
	max_daily int,
	opening TIME,
	closing TIME,
	FOREIGN KEY (owner_id) REFERENCES users(userid)
);

CREATE TABLE reservations(
    reservation_id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
	customer_id int,
    customer_name text,
	resto_id int,
    resto_name text,
	confirmation int DEFAULT 0,
	reservation_date DATETIME,
    FOREIGN KEY (customer_id) REFERENCES users(userid),
    FOREIGN KEY (resto_id) REFERENCES restaurants(restaurant_id)
    -- time
);

CREATE TABLE meals(
	meal_id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
	meal_name varchar(255) NOT NULL,
	meal_price int NOT NULL,
	meal_description varchar(255) NOT NULL,
	resto_id int,
    FOREIGN KEY (resto_id) REFERENCES restaurants(restaurant_id)
);

CREATE TABLE reviews(
	review_id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
	review_body text NOT NULL,
	customer_id int,
    customer_name text,
	resto_id int,
	FOREIGN KEY (resto_id) REFERENCES restaurants(restaurant_id),
	FOREIGN KEY (customer_id) REFERENCES users(userid)
);

INSERT INTO users(email, username, password, user_type) VALUES ('mikee@gmail.com', 'Mikee', '123456', 'c');
INSERT INTO users(email, username, password, user_type) VALUES ('jollybee@gmail.com', 'Jolly Bee', '123456', 'o');
INSERT INTO users(email, username, password, user_type) VALUES ('ronald@gmail.com', 'Ronald McDonald', '123456', 'o');
INSERT INTO users(email, username, password, user_type) VALUES ('sanders@gmail.com', 'Col Sanders', '123456', 'o');
INSERT INTO users(email, username, password, user_type) VALUES ('renzo@gmail.com', 'Renzo', '123456', 'c');
INSERT INTO users(email, username, password, user_type) VALUES ('sydney@gmail.com', 'Sydney', '123456', 'c');
INSERT INTO restaurants(restaurant_name, restaurant_description, restaurant_location, owner_id, max_daily, opening, closing) VALUES ('Jollibee', "Bida ang Saya!", "BGC", 2, 10, "08:00:00", "20:00:00");
INSERT INTO restaurants(restaurant_name, restaurant_description, restaurant_location, owner_id, max_daily, opening, closing) VALUES ('McDonalds', "Love ko 'to!", "BGC", 3, 5, "00:00:00", "24:00:00");
INSERT INTO restaurants(restaurant_name, restaurant_description, restaurant_location, owner_id, max_daily, opening, closing) VALUES ('KFC', "Fingerlicking Good", "Katipunan", 4, 1, "06:00:00", "22:00:00");
INSERT INTO restaurants(restaurant_name, restaurant_description, restaurant_location, owner_id, max_daily, opening, closing) VALUES ('BonChon', "Korean Style Chicken!", "Regis", 4, 10, "10:00:00", "21:00:00");
INSERT INTO reservations(customer_id, resto_id, reservation_date) VALUES (1, 1, NOW());
INSERT INTO reservations(customer_id, resto_id, reservation_date) VALUES (1, 2, NOW());
INSERT INTO reservations(customer_id, resto_id, reservation_date) VALUES (2, 1, '2018-05-04 14:00:08');
INSERT INTO reservations(customer_id, resto_id, reservation_date) VALUES (6, 1, '2018-05-04 14:00:08');
INSERT INTO meals(meal_name, meal_price, meal_description, resto_id) VALUES ("Chicken", "99", "Best Chicken Ever!", "2");
INSERT INTO meals(meal_name, meal_price, meal_description, resto_id) VALUES ("Wagyu", "1000", "Overpriced Meat!", "3");
