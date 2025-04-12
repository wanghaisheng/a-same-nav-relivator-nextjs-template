import { testSQLite } from "./sqlite/test";
import { testPostgres } from "./postgres/test";

async function runTests() {
  try {
    console.log("Starting database tests...\n");

    // Test SQLite
    console.log("=== Testing SQLite ===");
    await testSQLite();
    console.log("\nSQLite tests completed\n");

    // Test PostgreSQL
    console.log("=== Testing PostgreSQL ===");
    await testPostgres();
    console.log("\nPostgreSQL tests completed\n");

    console.log("All database tests completed successfully");
  } catch (error) {
    console.error("Error running tests:", error);
    process.exit(1);
  }
}

// Run all tests
runTests().catch(console.error); 