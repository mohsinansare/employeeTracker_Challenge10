import inquirer from 'inquirer';
import { getAllEmployees, getAllRoles, updateEmployeeRole } from '../db/queries';
import { Employee, Role } from 'types';


export const promptForDepartmentName = async (): Promise<string> => {
  const { deptName } = await inquirer.prompt({
    type: 'input',
    name: 'deptName',
    message: 'Enter the department name:',
    validate: (input) => (input ? true : 'Department name cannot be empty'),
  });
  return deptName;
};


export const promptUpdateEmployeeRole = async (): Promise<void> => {
  try {
    // Get current employees and roles
    const employees: Employee[] = await getAllEmployees();
    const roles: Role[] = await getAllRoles();

    if (employees.length === 0) {
      console.log('No employees found in the database.');
      return;
    }

    if (roles.length === 0) {
      console.log('No roles found in the database.');
      return;
    }

    // Create choices for the prompts
    const employeeChoices = employees.map(emp => ({
      name: `${emp.first_Name} ${emp.last_Name}`,
      value: emp.emp_id
    }));

    const roleChoices = roles.map(role => ({
      name: role.title,
      value: role.role_id
    }));

    // Prompt user to select employee and new role
    const answers = await inquirer.prompt([
      {
        type: 'list',
        name: 'employeeId',
        message: 'Which employee\'s role do you want to update?',
        choices: employeeChoices
      },
      {
        type: 'list',
        name: 'roleId',
        message: 'Which role do you want to assign to the employee?',
        choices: roleChoices
      }
    ]);

    // Update the employee's role
    await updateEmployeeRole(answers.employeeId, answers.roleId);

  } catch (error) {
    console.error('Error updating employee role:', error);
  }
};