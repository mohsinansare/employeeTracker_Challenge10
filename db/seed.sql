-- Insert departments first
INSERT INTO department (dept_name) 
VALUES 
    ('Engineering'),
    ('Sales'),
    ('Marketing'),
    ('Human Resources'),
    ('Finance');

-- Verify departments
SELECT * FROM department;

-- Insert roles
INSERT INTO roles (title, salary, department_id) 
VALUES
    ('Software Engineer', 85000.00, 1),
    ('Senior Engineer', 120000.00, 1),
    ('Sales Representative', 65000.00, 2),
    ('Sales Manager', 95000.00, 2),
    ('Marketing Specialist', 60000.00, 3),
    ('HR Manager', 90000.00, 4),
    ('Financial Analyst', 75000.00, 5);

-- Verify roles
SELECT * FROM roles;

-- Insert employees (managers first since other employees will reference them)
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
    ('John', 'Doe', 2, 1),      -- Engineering Manager
    ('Sarah', 'Smith', 4, 2),   -- Sales Manager
    ('Michael', 'Johnson', 6, 4); -- HR Manager

-- Verify managers were inserted
SELECT * FROM employees;

-- Insert remaining employees
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
    ('Alice', 'Brown', 1, 1),      -- Reports to John
    ('Bob', 'Wilson', 1, 1),       -- Reports to John
    ('Carol', 'Davis', 3, 2),      -- Reports to Sarah
    ('David', 'Miller', 3, 2),     -- Reports to Sarah
    ('Emma', 'Jones', 5, 2),       -- Reports to Sarah
    ('Frank', 'Taylor', 7, 3);     -- Reports to Michael

-- Verify all data
SELECT * FROM employees;