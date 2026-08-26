// Import the run helper from the database connection file
import { run } from "./db.mjs";

// Create the opening hours table
async function setupOpeningHours() {
  // Create the table if it does not exist
  await run(`CREATE TABLE IF NOT EXISTS opening_hours (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    day_name TEXT NOT NULL UNIQUE,
    opening_time TEXT NOT NULL,
    closing_time TEXT NOT NULL,
    display_order INTEGER NOT NULL
  )`);

    // Insert Monday opening hours
  await run(
    "INSERT INTO opening_hours (day_name, opening_time, closing_time, display_order) VALUES (?, ?, ?, ?)",
    ["Monday", "9am", "6pm", 1]
  );

  // Insert Tuesday opening hours
  await run(
    "INSERT INTO opening_hours (day_name, opening_time, closing_time, display_order) VALUES (?, ?, ?, ?)",
    ["Tuesday", "9am", "6pm", 2]
  );

  // Insert Wednesday opening hours
  await run(
    "INSERT INTO opening_hours (day_name, opening_time, closing_time, display_order) VALUES (?, ?, ?, ?)",
    ["Wednesday", "9am", "6pm", 3]
  );

  // Insert Thursday opening hours
  await run(
    "INSERT INTO opening_hours (day_name, opening_time, closing_time, display_order) VALUES (?, ?, ?, ?)",
    ["Thursday", "9am", "6pm", 4]
  );

  // Insert Friday opening hours
  await run(
    "INSERT INTO opening_hours (day_name, opening_time, closing_time, display_order) VALUES (?, ?, ?, ?)",
    ["Friday", "9am", "6pm", 5]
  );

  // Insert Saturday opening hours
  await run(
    "INSERT INTO opening_hours (day_name, opening_time, closing_time, display_order) VALUES (?, ?, ?, ?)",
    ["Saturday", "9am", "6pm", 6]
  );

  // Insert Sunday opening hours
  await run(
    "INSERT INTO opening_hours (day_name, opening_time, closing_time, display_order) VALUES (?, ?, ?, ?)",
    ["Sunday", "9am", "6pm", 7]
  );


  console.log("Opening hours table and data created.");
  process.exit(0);
}

// Run the opening hours setup function
setupOpeningHours();
