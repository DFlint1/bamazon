
CREATE DATABASE bamazon;


CREATE TABLE products (
  item_id INTEGER(11) AUTO_INCREMENT NOT NULL PRIMARY KEY,
  product_name VARCHAR(50) NOT NULL,
  department_name VARCHAR(50) NOT NULL,
  price DECIMAL(10) NOT NULL,
  cost_quantity INTEGER(10) NOT NULL
  );
USE bamazon;
INSERT INTO products (item_id, product_name, department_name, price, cost_quantity) 
VALUES (1, "logo_mug", "games", 14.99, 238), (2, "logo_bottle", "games", 14.99, 149),
(3, "logo_bag", "games", 9.99, 102), (4, "ss_tee", "games", 21.99, 437),
(5, "ls_tee", "games", 22.99, 401), (6, "sticker", "games",4.99, 1102),
(7, "key_chain", "games", 7.99, 238), (8, "hat", "games", 14.99, 38), 
(9, "pen", "games", 5.99, 102), (10, "flashlight", "games", 11.99, 148);

USE bamazon;
ALTER TABLE products
MODIFY COLUMN price Decimal(10,2);

USE bamazon;
ALTER TABLE products
MODIFY COLUMN cost_quantity INTEGER(10) NOT NULL;



