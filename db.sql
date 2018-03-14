CREATE TABLE customers (
customerID SERIAL PRIMARY KEY,
name VARCHAR(500) NOT NULL,
address VARCHAR(500) NOT NULL,
city VARCHAR(500) NOT NULL,
st VARCHAR(500) NOT NULL,
zip smallint NOT NULL,
phone VARCHAR(500) NOT NULL,
email VARCHAR(500) NOT NULL UNIQUE,
username VARCHAR(500) NOT NULL UNIQUE,
password VARCHAR(500) NOT NULL
);

CREATE TABLE orders (
orderID SERIAL PRIMARY KEY,
customerID smallint,
FOREIGN KEY (customerID) REFERENCES customers(customerID),
paymentMethodID smallint NOT NULL,
FOREIGN KEY (paymentMethodID) REFERENCES payments(paymentID),
numberOfTies smallint NOT NULL,
orderNeededBy date NOT NULL,
color VARCHAR(300) NOT NULL,
typeOfPattern VARCHAR(300) NOT NULL,
typeOfFabric VARCHAR(300) NOT NULL,
notes VARCHAR(5000)
);

CREATE TABLE pictures (
pictureID SERIAL PRIMARY KEY,
customerID smallint NOT NULL,
FOREIGN KEY (customerID) REFERENCES customers(customerID),
orderID smallint NOT NULL,
FOREIGN KEY (orderID) REFERENCES orders(orderID),
img bytea NOT NULL
);

CREATE TABLE payments (
paymentID SERIAL PRIMARY KEY,
payment VARCHAR(300) NOT NULL UNIQUE
);

CREATE TABLE owners (
ownerID SERIAL PRIMARY KEY,
contactPhone VARCHAR(200) NOT NULL,
contactEmail VARCHAR(300) NOT NULL,
name VARCHAR(500) NOT NULL,
bio VARCHAR(5000) NOT NULL
);

CREATE USER posttemp WITH PASSWORD 'cs313';
GRANT SELECT, INSERT, UPDATE, DELETE ON SCHEMA public TO posttemp;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO posttemp;