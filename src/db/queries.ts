import { pool } from '../db/index';
import { Department, Role, Employee } from '../types/index';

export const viewDepartments = async (): Promise<void> => {
  try {
    const result = await pool.query<Department>('SELECT * FROM department ORDER BY dept_id');
    console.table(result.rows);
  } catch (err) {
    console.error('Error viewing departments:', err);
  }
};
export const viewRoles = async (): Promise<{ id: number; title: string; }[]> => {
  try {
    const query = `
      SELECT 
          r.role_id AS id,
          r.title
      FROM roles r
      ORDER BY r.role_id;
    `;

    const result = await pool.query(query);

    // Map the result rows to match the expected type
    const roles = result.rows.map(row => ({
      id: row.id,
      title: row.title,
    }));

    return roles;
  } catch (err) {
    console.error('Error viewing roles:', err);
    throw err; // Propagate the error if necessary
  }
};


export const viewEmployees = async (): Promise<{ id: number; firstName: string; lastName: string; }[]> => {
  try {
    const query = `
    SELECT 
        e.employee_id AS id,
        e.first_name AS firstName,
        e.last_name AS lastName
    FROM employees e
    ORDER BY e.employee_id;
    `;

    const result = await pool.query(query);
    
    // Map the result rows to match the expected type
    const employees = result.rows.map(row => ({
      id: row.id,
      firstName: row.firstname,
      lastName: row.lastname,
    }));

    return employees;
  } catch (err) {
    console.error('Error viewing employees:', err);
    throw err; // Ensure the error propagates if necessary
  }
};


export const addDepartment = async (name: string): Promise<void> => {
  try {
    const query = 'INSERT INTO department (dept_name) VALUES ($1) RETURNING *';
    const result = await pool.query<Department>(query, [name]);
    console.log('Department added successfully:', result.rows[0]);
  } catch (err) {
    console.error('Error adding department:', err);
  }
};

export const addRole = async (
  title: string,
  salary: number,
  departmentId: number
): Promise<void> => {
  try {
    const query = `
      INSERT INTO roles (title, salary, department_id)
      VALUES ($1, $2, $3)
      RETURNING *
    `;
    const result = await pool.query<Role>(query, [title, salary, departmentId]);
    console.log('Role added successfully:', result.rows[0]);
  } catch (err) {
    console.error('Error adding role:', err);
  }
};

export const addEmployee = async (
  firstName: string,
  lastName: string,
  roleId: number,
  managerId: number | null
): Promise<void> => {
  try {
    const query = `
      INSERT INTO employees (first_name, last_name, role_id, manager_id)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;
    const result = await pool.query<Employee>(query, [firstName, lastName, roleId, managerId]);
    console.log('Employee added successfully:', result.rows[0]);
  } catch (err) {
    console.error('Error adding employee:', err);
  }
};

export const getAllEmployees = async (): Promise<Employee[]> => {
  try {
    const query = `
      SELECT 
        emp_id,
        first_name,
        last_name,
        role_id
      FROM employee
      ORDER BY last_name, first_name
    `;
    const result = await pool.query<Employee>(query);
    return result.rows;
  } catch (err) {
    console.error('Error getting employees:', err);
    return [];
  }
};

export const getAllRoles = async (): Promise<Role[]> => {
  try {
    const query = `
      SELECT role_id, title
      FROM role
      ORDER BY title
    `;
    const result = await pool.query<Role>(query);
    return result.rows;
  } catch (err) {
    console.error('Error getting roles:', err);
    return [];
  }
};

// function to get employees for selection
export const getEmployeesForSelection = async () => {
  try {
    const query = `
      SELECT 
        e.emp_id,
        e.first_name,
        e.last_name,
        r.title as role_title
      FROM employee e
      JOIN role r ON e.role_id = r.role_id
      ORDER BY e.last_name, e.first_name
    `;
    const result = await pool.query(query);
    return result.rows;
  } catch (err) {
    console.error('Error getting employees:', err);
    return [];
  }
};

// Add function to get roles for selection
export const getRolesForSelection = async () => {
  try {
    const query = `
      SELECT role_id, title, salary, department_id
      FROM role
      ORDER BY title
    `;
    const result = await pool.query(query);
    return result.rows;
  } catch (err) {
    console.error('Error getting roles:', err);
    return [];
  }
};

export const updateEmployeeRole = async (
  employeeId: number,
  newRoleId: number
): Promise<void> => {
  try {
    const query = `
      UPDATE employees
      SET role_id = $2
      WHERE emp_id = $1
      RETURNING *
    `;
    const result = await pool.query<Employee>(query, [employeeId, newRoleId]);
    
    if (result.rowCount === 0) {
      console.log('No employee found with the specified ID');
      return;
    }
    
    console.log('Employee role updated successfully:', result.rows[0]);
  } catch (err) {
    console.error('Error updating employee role:', err);
  }
};