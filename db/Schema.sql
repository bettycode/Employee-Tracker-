
--Drops the employee-traker-db if it exists 
DROP DATABASE IF EXISTS Employee-Traker-db;

-- Created the DB " employee-traker-db"
CREATE DATABASE Employee-Traker-db;

-- Use the DB  employee-traker-db for all the rest of the script
USE Employee-Traker-db;

-- Created the tables
CREATE TABLE department (
  id int AUTO_INCREMENT NOT NULL,
  name varchar(30) NOT NULL,
  PRIMARY KEY(id)
);

CREATE TABLE role (
  id int AUTO_INCREMENT NOT NULL,
  title VARCHAR(30)  NOT NULL,
  salary  DECIMAL(10),
  department_id INT
  PRIMARY KEY(id)
);


CREATE TABLE employee(
  id int AUTO_INCREMENT NOT NULL,
  first_name VARCHAR(30),
  last_name - VARCHAR(30),
  salary  DECIMAL(10),
  role_id - INT,
  manager_id - INT,
  PRIMARY KEY(id)
);





