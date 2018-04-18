DROP DATABASE IF EXISTS bamazonDB;

CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products (
    id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(45) NOT NULL,
    department_name VARCHAR(45),
    price DECIMAL(10,2) NULL,
    quantity INT NULL,
    PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, quantiy)
VALUES ("Surf Board", "Sporting Goods", 400.00, 10),
        ("MacBook Air", "Electronics", 1500.00, 15),
        ("UE Boom Speaker", "Electronics", 99.00, 25),
        ("Football", "Sporting Goods", 19.99, 50),
        ("My Pillow", "Home Goods", 45.99, 20),
        ("Fleece Blanket", "Home Goods", 24.99, 10),
        ("Fishing Pole", "Sporting Goods", 79.99, 25),
        ("Playstation 4", "Electronics", 299.99, 30),
        ("XBox", "Electronics", 279.99, 50),
        ("Keurig Coffee Maker", "Home Goods", 65.49, 100);
    