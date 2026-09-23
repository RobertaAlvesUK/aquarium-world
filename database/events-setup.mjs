// Import the run helper from the database connection file
import { run } from "./db.mjs";

// Create the events table and add Aquarium World event data
async function setupEvents() {
  // Create the events table if it does not exist
  await run(`CREATE TABLE IF NOT EXISTS events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL UNIQUE,
    event_year INTEGER NOT NULL,
    event_date TEXT NOT NULL,
    category TEXT NOT NULL,
    summary TEXT NOT NULL,
    details TEXT NOT NULL
  )`);

  // Store current and past Aquarium World events
  const events = [
    [
      "Ocean Conservation Workshop",
      2026,
      "2026-10-10",
      "Conservation Workshop",
      "Discover simple ways to help protect marine habitats.",
      "Join the Aquarium World conservation team for an educational workshop about ocean pollution, sustainable choices and protecting marine habitats."
    ],
    [
      "After-Dark Torchlight Tour",
      2026,
      "2026-10-24",
      "After-Dark Tour",
      "Explore selected aquarium habitats after normal opening hours.",
      "This guided evening tour uses torchlights to introduce visitors to animals that are active or easier to observe in lower light."
    ],
    [
      "Family Rockpool Discovery Day",
      2026,
      "2026-11-07",
      "Family Activity",
      "A hands-on family activity focused on coastal rockpool animals.",
      "Families can learn about shore crabs, sea urchins and starfish through guided activities designed for younger visitors."
    ],
    [
      "Marine Scientist Guest Talk",
      2026,
      "2026-11-21",
      "Educational Talk",
      "Hear from a guest speaker about deep-sea research.",
      "A marine science guest speaker will explain how researchers study deep-sea animals and why these habitats need protection."
    ],
    [
      "Winter Ocean Festival",
      2026,
      "2026-12-12",
      "Seasonal Celebration",
      "Celebrate the winter season with ocean-themed family activities.",
      "The Winter Ocean Festival includes themed trails, short talks and family activities across Aquarium World."
    ],
    [
      "Summer Marine Festival",
      2025,
      "2025-08-16",
      "Seasonal Celebration",
      "A past summer celebration of marine life and conservation.",
      "This event included marine-themed activities, conservation displays and family learning sessions."
    ],
    [
      "Family Shark Discovery Day",
      2025,
      "2025-09-13",
      "Family Activity",
      "A past family activity about shark habitats and conservation.",
      "Visitors learned about shark adaptations, care routines and the importance of shark conservation."
    ],
    [
      "Coastal Wildlife Talk",
      2025,
      "2025-10-18",
      "Educational Talk",
      "A past educational talk about animals found around the UK coast.",
      "The talk introduced visitors to coastal habitats and the marine animals that live around rocky shorelines."
    ]
  ];

  // Insert each event once without duplicating it if this file is run again
  for (const event of events) {
    await run(
      `INSERT OR IGNORE INTO events
       (title, event_year, event_date, category, summary, details)
       VALUES (?, ?, ?, ?, ?, ?)`,
      event
    );
  }

  console.log("Events table and data created.");
  process.exit(0);
}

// Run the events setup function
setupEvents();
