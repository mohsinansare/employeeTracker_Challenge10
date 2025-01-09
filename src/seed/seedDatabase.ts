import { readFileSync } from 'fs';
import { pool } from '../db'; // Adjust the path to your database connection file

const seedDatabase = async (): Promise<void> => {
  try {
    console.log('Starting database seeding...');
    
    // Load SQL seed script
    const seedSql = readFileSync('.src/seed.ts', 'utf-8'); // Replace with the actual path to your seed.sql file

    // Execute the SQL script
    await pool.query(seedSql);

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    // Close the database connection
    await pool.end();
  }
};

// Run the seed function if the file is executed directly
if (require.main === module) {
  seedDatabase().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}











