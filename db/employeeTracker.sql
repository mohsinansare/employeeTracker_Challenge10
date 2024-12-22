DROP DATABASE IF EXISTS employeeTracker;

CREATE DATABASE employeeTracker;

\c employeeTracker;

CREATE TABLE department(
  dept_id SERIAL PRIMARY KEY,
  dept_name VARCHAR(30) NOT NULL,
  FOREIGN KEY (role_id) REFERENCES roles (role_id)
  FOREIGN KEY 
);

CREATE TABLE roles (
  role_id SERIAL PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL(10, 2) NOT NULL,
  department_id INTEGER NOT NULL,
  FOREIGN KEY (dept_id) REFERENCES department (dept_id)

CREATE TABLE employees (
  employee_id SERIAL PRIMARY KEY,
  first_Name VARCHAR(30) NOT NULL,
  last_Name VARCHAR(30) NOT NULL,
  role_id INTEGER NOT NULL
  manager_id INTEGER,
  FOREIGN KEY (role_id) REFERENCES roles (role_id),
  FOREIGN KEY (manager_id) REFERENCES employees (employee_id)
);

DO $$

  DECLARE
    -- dept_count INTEGER;
    -- role_count INTEGER;
    -- employee_count INTEGER;
    -- manager_count INTEGER;

  BEGIN

    -- dept_count := 5;
    -- role_count := 10;
    -- employee_count := 20;
    -- manager_count := 5;
