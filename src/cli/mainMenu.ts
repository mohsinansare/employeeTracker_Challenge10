import inquirer from 'inquirer';
import {
  viewDepartments,
  viewRoles,
  viewEmployees,
  addDepartment,
  addRole,
  addEmployee,
  updateEmployeeRole,
} from '../db/queries';

export const mainMenu = async (): Promise<void> => {
  const { choice } = await inquirer.prompt([
    {
      type: 'list',
      name: 'choice',
      message: 'What would you like to do?',
      choices: [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update an employee role',
        'Exit',
      ],
    },
  ]);

  switch (choice) {
    case 'View all departments':
      await viewDepartments();
      break;
    case 'View all roles':
      await viewRoles();
      break;
    case 'View all employees':
      await viewEmployees();
      break;
    case 'Add a department':
      const { departmentName } = await inquirer.prompt([
        {
          type: 'input',
          name: 'departmentName',
          message: 'What is the name of the department?'
        }
      ]);
      await addDepartment(departmentName);
      break;
    case 'Add a role':
      const roleAnswers = await inquirer.prompt([
        {
          type: 'input',
          name: 'title',
          message: 'What is the title of the role?'
        },
        {
          type: 'number',
          name: 'salary',
          message: 'What is the salary for this role?'
        },
        {
          type: 'number',
          name: 'departmentId',
          message: 'What is the department ID for this role?'
        }
      ]);
      await addRole(roleAnswers.title, roleAnswers.salary, roleAnswers.departmentId);
      break;
    case 'Add an employee':
      const employeeAnswers = await inquirer.prompt([
        {
          type: 'input',
          name: 'firstName',
          message: "What is the employee's first name?"
        }, 
        {
          type: 'input',
          name: 'lastName',
          message: "What is the employee's last name?"
        },
        {
          type: 'number',
          name: 'roleId',
          message: "What is the employee's role ID?"
        },
        {
          type: 'number',
          name: 'managerId',
          message: "What is the employee's manager ID?"
        }
      ]);
      await addEmployee(
        employeeAnswers.firstName,
        employeeAnswers.lastName,
        employeeAnswers.roleId,
        employeeAnswers.managerId
      );
      break;

    case 'Update an employee role':
      try {
        // Fetch employees and roles from the database
        const employees: { id: number; firstName: string; lastName: string }[] = await viewEmployees();
        const roles: { id: number; title: string }[] = await viewRoles();

        if (employees.length === 0) {
          console.log('No employees found in the database.');
          break;
        }

        if (roles.length === 0) {
          console.log('No roles found in the database.');
          break;
        }

        // Map employees and roles into choices for the prompt
        const employeeChoices = employees.map((emp) => ({
          name: `${emp.firstName} ${emp.lastName}`, // Display name
          value: emp.id // Use employee ID internally
        }));

        const roleChoices = roles.map((role) => ({
          name: role.title, // Display role title
          value: role.id // Use role ID internally
        }));

        // Prompt the user to select an employee and a new role
        const updateAnswers = await inquirer.prompt([
          {
            type: 'list',
            name: 'employeeId',
            message: 'Select the employee whose role you want to update:',
            choices: employeeChoices
          },
          {
            type: 'list',
            name: 'newRoleId',
            message: 'Select the new role to assign to the employee:',
            choices: roleChoices
          }
        ]);

        // Update the employee's role in the database
        await updateEmployeeRole(updateAnswers.employeeId, updateAnswers.newRoleId);
        console.log('Employee role updated successfully.');
      } catch (error) {
        console.error('Error updating employee role:', error);
      }
      break;

    case 'Exit':
      process.exit(0);
  }

  await mainMenu(); // Repeat menu
};
