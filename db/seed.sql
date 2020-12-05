

INSERT INTO department(name) 
VALUES 
('Information Tecnology'),--1
('Marketing'),--2
('Finance');--3

INSERT INTO role (role_title, role_salary,department_id) 
VALUES
('Developer', 130000, 1), --1
('Marketing Specialist', 70000, 2),--2
('Accountant',50000,3),--3
('Billing', 30000, 3);--3


INSERT INTO employee (first_name, last_name, role_id, manager_id)
 VALUES
 ('sam', 'Adam', 2, 5),--1
 ('Jon', 'Doe', 1, NULL),--2
 ('eva', 'Adam', 3, 3),--3
 ('sera', 'Doe', 1, NULL),--4
 ('kevan', 'Adam', 2, 1),--5
 ('brook', 'Doe', 4, NULL);--6

