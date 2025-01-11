export interface Department {
    dept_id: number;
    dept_name: string;
  }
  
  export interface Role {
    role_id: number;
    title: string;
    salary: number;
    dept_id: number;
  }
  
  export interface Employee {
    // emp_id: number;
    employee_id: number;
    first_Name: string;
    last_Name: string;
    role_id: number;
    manager_id: number | null;
  }
  