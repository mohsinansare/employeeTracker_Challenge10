DROP DATABASE IF EXISTS employeetracker;
CREATE DATABASE employeeTracker;

-- Connect to the new database
\c employeetracker

-- Drop tables if they exist (in correct order due to dependencies)
DROP TABLE IF EXISTS employees;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS department;

--Create the department table
CREATE TABLE department (
    dept_id SERIAL PRIMARY KEY,
    dept_name VARCHAR(30) NOT NULL
);

-- Create the roles table
CREATE TABLE roles (
    role_id SERIAL PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10, 2) NOT NULL,
    department_id INTEGER NOT NULL,
    FOREIGN KEY (department_id) REFERENCES department (dept_id)
    ON DELETE CASCADE
);


-- Create the employees table
CREATE TABLE employees (
    employee_id SERIAL PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER NOT NULL,
    manager_id INTEGER,
    FOREIGN KEY (role_id) REFERENCES roles (role_id),
    FOREIGN KEY (manager_id) REFERENCES employees (employee_id)
    ON DELETE CASCADE
);




-- Begin a DO block for additional logic (PostgreSQL only)
DO $$
BEGIN
    -- Insert a new employee only if they do not already exist
    IF NOT EXISTS (
        SELECT 1 FROM employees WHERE first_name = 'Test' AND last_name = 'Employee'
    ) THEN
        INSERT INTO employees (first_name, last_name, role_id, manager_id)
        VALUES ('Test', 'Employee', 2, 1);
        RAISE NOTICE 'Test employee added!';
    ELSE
        RAISE NOTICE 'Test employee already exists!';
    END IF;
END $$;