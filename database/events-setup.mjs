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
      "Learn simple actions that help protect marine habitats.",
      "Meet the Aquarium World conservation team for a practical workshop on reducing plastic waste, making sustainable choices and protecting marine habitats."
    ],
    [
      "After-Dark Torchlight Tour",
      2026,
      "2026-10-24",
      "After-Dark Tour",
      "Explore selected aquarium habitats after normal opening hours.",
      "Join an evening guided tour using torchlights to discover animals and habitats in lower light. The tour introduces the importance of respectful observation and animal welfare."
    ],
    [
      "Halloween Aquarium Trail",
      2026,
      "2026-10-31",
      "Seasonal Celebration",
      "Follow an after-dark Halloween trail through selected aquarium habitats.",
      "Families can follow a Halloween-themed trail and learn about animals that are active after dark. The activity includes short facts about nocturnal marine life."
    ],
    [
      "Family Rockpool Discovery Day",
      2026,
      "2026-11-07",
      "Family Activity",
      "A hands-on family session about coastal rockpool animals.",
      "Families can learn about shore crabs, sea urchins, starfish and other coastal animals through guided activities designed for younger visitors."
    ],
    [
      "Marine Scientist Guest Talk",
      2026,
      "2026-11-21",
      "Educational Talk",
      "Hear how researchers study deep-sea animals and habitats.",
      "A marine science guest speaker explains how deep-sea research is carried out and why conserving ocean habitats matters."
    ],
    [
      "Christmas Underwater Celebration",
      2026,
      "2026-12-12",
      "Seasonal Celebration",
      "Celebrate the festive season with ocean-themed family activities.",
      "Visitors can follow a festive underwater trail, take part in family activities and discover how marine animals adapt to winter conditions."
    ],
    [
      "Family Shark Discovery Day",
      2025,
      "2025-09-13",
      "Family Activity",
      "A past family activity about shark habitats and conservation.",
      "Visitors explored shark adaptations, care routines and the importance of shark conservation through family-friendly activities."
    ],
    [
      "Coastal Wildlife Talk",
      2025,
      "2025-10-18",
      "Educational Talk",
      "A past talk about animals found around the UK coast.",
      "The talk introduced visitors to coastal habitats, rocky shorelines and the animals that depend on them."
    ],
    [
      "Plastic-Free Oceans Workshop",
      2025,
      "2025-10-25",
      "Conservation Workshop",
      "A past practical workshop about reducing plastic pollution.",
      "Visitors explored how plastic waste affects marine life and identified simple changes that can reduce pollution at home and in their community."
    ],
    [
      "Halloween Underwater Trail",
      2025,
      "2025-10-31",
      "Seasonal Celebration",
      "A past Halloween trail introducing families to animals active after dark.",
      "Families followed a Halloween-themed aquarium trail and discovered facts about nocturnal marine animals and their habitats."
    ],
    [
      "After-Dark Deep Sea Tour",
      2025,
      "2025-11-08",
      "After-Dark Tour",
      "A past evening tour focused on mysterious deep-sea animals.",
      "This guided evening tour introduced visitors to giant squid, jellyfish and lanternfish, with a focus on adaptations to dark ocean habitats."
    ],
    [
      "Christmas Ocean Celebration",
      2025,
      "2025-12-13",
      "Seasonal Celebration",
      "A past festive event with ocean-themed family activities.",
      "Families took part in a festive aquarium trail and short activities inspired by marine life during the winter season."
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
