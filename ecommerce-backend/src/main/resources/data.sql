insert into category(id, name)
values (10001, 'Digital Watch');

insert into category(id, name)
values (10002, 'Smartphone');

insert into category(id, name)
values (10003, 'Tablet');

insert into category(id, name)
values (10004, 'Headphone');

insert into product(id, name, description, price, category_id)
values (20001, 'iWatch Series 9', 'Apple product description', 599.99, 10001);

insert into product(id, name, description, price, category_id)
values (20002, 'iPhone 15', 'Apple product description', 799.99, 10002);

insert into product(id, name, description, price, category_id)
values (20003, 'Galaxy S', 'Samsung product description', 699.99, 10002);

insert into product(id, name, description, price, category_id)
values (20004, 'iPad (15th gen)', 'Apple product description', 399.99, 10003);

insert into product(id, name, description, price, category_id)
values (20005, 'WH-H800', 'Sony product description', 599.99, 10004);

INSERT INTO customer_order (id, subtotal, tax, total)
VALUES (30001, 1200.00, 120.00, 1320.00);

INSERT INTO customer_order (id, subtotal, tax, total)
VALUES (30002, 800.00, 80.00, 880.00);

-- For Order ID 1
INSERT INTO order_product (id, price, quantity, product_id, customer_order_id)
VALUES (40001, 599.99, 2, 20001, 30001); -- 2 iWatch Series 9

INSERT INTO order_product (id, price, quantity, product_id, customer_order_id)
VALUES (40002, 799.99, 1, 20002, 30001); -- 1 iPhone 15

-- For Order ID 2
INSERT INTO order_product (id, price, quantity, product_id, customer_order_id)
VALUES (40003, 699.99, 1, 20003, 30002); -- 1 Galaxy S

INSERT INTO order_product (id, price, quantity, product_id, customer_order_id)
VALUES (40004, 399.99, 1, 20004, 30002); -- 1 iPad (15th gen)

INSERT INTO role (name)
VALUES ('USER');

INSERT INTO role (name)
VALUES ('ADMIN');