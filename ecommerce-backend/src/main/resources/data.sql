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