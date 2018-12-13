DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products
(
  -- Create a numeric column called "id" which will automatically increment its default value as we create new rows. --
	id INTEGER(10) AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(50),
    department_name VARCHAR(50),
    price INTEGER(10),
    stock_quantity INTEGER(10),
    PRIMARY KEY (id)
);


INSERT INTO products 
    (product_name, department_name, price, stock_quantity)
VALUES
    ("Car", "Transportation", 20000, 3),
    ("Vase", "Domestic", 70, 7),
    ("Wrench", "Hardware", 10, 5),
    ("Motorcylce", "Transportation", 13000, 4),
    ("Chair", "Domestic", 35, 8),
    ("Screwdriver", "Hardware", 6, 10),
    ("Math Textbook", "School", 50, 9),
    ("Spiral Bound Notebook", "School", 10, 12),
    ("Permanent Markers", "School", 5, 15),
    ("Electric Guitar", "Music", 200, 50);

SELECT * FROM products;
