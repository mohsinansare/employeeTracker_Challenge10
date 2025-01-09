import { mainMenu } from './cli/mainMenu';

(async () => {
    try {
        console.log('Welcome to the Employee Management System');
        await mainMenu();
    } catch (error) {
        console.error('An unexpected error occurred:', error);
    } finally {
        console.log('Thank you for using the Employee Management System. Goodbye!');
        process.exit(0);
    }
})();