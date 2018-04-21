DROP DATABASE IF EXISTS bamazonDB;

CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products (
    `id` INT UNSIGNED AUTO_INCREMENT NOT NULL,
    `product_name` VARCHAR(45) NOT NULL,
    `department_name` VARCHAR(45),
    `price` DECIMAL(10,2) NULL,
    `quantity` INT NULL,
    PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, quantiy)
VALUES ("Surf Board", "Sporting Goods", 429.99, 10),
        ("MacBook Air", "Electronics", 1500.99, 20),
        ("UE Boom Speaker", "Electronics", 99.97, 50),
        ("Football", "Sporting Goods", 19.99, 25),
        ("My Pillow", "Home Goods", 45.99, 20),
        ("Fleece Blanket", "Home Goods", 24.99, 50),
        ("Fishing Pole", "Sporting Goods", 79.99, 18),
        ("Playstation 4", "Electronics", 299.99, 30),
        ("XBox", "Electronics", 279.99, 45),
        ("Keurig Coffee Maker", "Home Goods", 65.49, 100);
    