// Import the run helper from the database connection file
import { run } from "./db.mjs";

// Create the AquaVerse database tables
async function setup() {

// Create the zones table if it does not exist
  await run(`CREATE TABLE IF NOT EXISTS zones (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT NOT NULL
  )`);

// Create the exhibits table if it does not exist
  await run(`CREATE TABLE IF NOT EXISTS exhibits (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    zone_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    FOREIGN KEY (zone_id) REFERENCES zones(id)
  )`);

// Create the messages table if it does not exist
  await run(`CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL
  )`);

// Insert the four AquaVerse zones
  const coralReef = await run(
    "INSERT INTO zones (name, slug, description) VALUES (?, ?, ?)",
    [
      "Coral Reef Zone",
      "coral-reef",
      "Explore colourful coral gardens, tropical fish and gentle sea turtles."
    ]
  );

  const deepSea = await run(
    "INSERT INTO zones (name, slug, description) VALUES (?, ?, ?)",
    [
      "Deep Sea Trench",
      "deep-sea",
      "Journey into the deep ocean and discover animals adapted to darkness."
    ]
  );

  const rockpools = await run(
    "INSERT INTO zones (name, slug, description) VALUES (?, ?, ?)",
    [
      "Coastal Rockpools",
      "rockpools",
      "Discover small sea creatures living between the rocks along the coast."
    ]
  );

  const freshwater = await run(
    "INSERT INTO zones (name, slug, description) VALUES (?, ?, ?)",
    [
      "Freshwater Rivers and Rainforest",
      "freshwater",
      "Travel through freshwater habitats filled with river animals and rainforest life."
    ]
  );

// Insert exhibits for the Coral Reef Zone
  await run(
    "INSERT INTO exhibits (zone_id, name, description) VALUES (?, ?, ?)",
    [coralReef.lastID, "Blacktip Reef Shark", "A sleek reef shark that glides through warm coral habitats."]
  );

  await run(
    "INSERT INTO exhibits (zone_id, name, description) VALUES (?, ?, ?)",
    [coralReef.lastID, "Reef Ray", "A graceful ray that moves through shallow tropical waters."]
  );

  await run(
    "INSERT INTO exhibits (zone_id, name, description) VALUES (?, ?, ?)",
    [coralReef.lastID, "Clownfish", "A bright orange-and-white fish that lives among sea anemones."]
  );

// Insert exhibits for the Deep Sea Trench
  await run(
    "INSERT INTO exhibits (zone_id, name, description) VALUES (?, ?, ?)",
    [deepSea.lastID, "Giant Squid", "A mysterious deep-sea animal with large eyes and long feeding tentacles."]
  );

  await run(
    "INSERT INTO exhibits (zone_id, name, description) VALUES (?, ?, ?)",
    [deepSea.lastID, "Giant Pacific Octopus", "An intelligent octopus that uses camouflage to hide in its habitat."]
  );

  await run(
    "INSERT INTO exhibits (zone_id, name, description) VALUES (?, ?, ?)",
    [deepSea.lastID, "Moon Jellyfish", "A translucent jellyfish that drifts gently through the water."]
  );

  await run(
    "INSERT INTO exhibits (zone_id, name, description) VALUES (?, ?, ?)",
    [deepSea.lastID, "Lanternfish", "A small deep-sea fish that produces light in the darkness."]
  );

// Insert exhibits for the Coastal Rockpools
await run(
  "INSERT INTO exhibits (zone_id, name, description) VALUES (?, ?, ?)",
  [rockpools.lastID, "Shore Crab", "A small coastal crab that hides beneath rocks along the shoreline."]
);

await run(
  "INSERT INTO exhibits (zone_id, name, description) VALUES (?, ?, ?)",
  [rockpools.lastID, "Starfish", "A sea creature with five arms that can be found in shallow coastal waters."]
);

await run(
  "INSERT INTO exhibits (zone_id, name, description) VALUES (?, ?, ?)",
  [rockpools.lastID, "Sea Urchin", "A round marine animal protected by sharp spines in rocky coastal habitats."]
);

await run(
  "INSERT INTO exhibits (zone_id, name, description) VALUES (?, ?, ?)",
  [rockpools.lastID, "Queen Angelfish", "A brightly coloured tropical fish with distinctive blue and yellow markings."]
);

await run(
  "INSERT INTO exhibits (zone_id, name, description) VALUES (?, ?, ?)",
  [rockpools.lastID, "Seahorse", "A small fish with a curled tail that moves slowly through sheltered coastal waters."]
);

// Insert exhibits for Freshwater Rivers and Rainforest
await run(
  "INSERT INTO exhibits (zone_id, name, description) VALUES (?, ?, ?)",
  [freshwater.lastID, "River Turtle", "A freshwater turtle that swims through rivers surrounded by lush plants."]
);

await run(
  "INSERT INTO exhibits (zone_id, name, description) VALUES (?, ?, ?)",
  [freshwater.lastID, "Freshwater River Fish", "A large fish adapted to life in slow-moving rivers and freshwater habitats."]
);

await run(
  "INSERT INTO exhibits (zone_id, name, description) VALUES (?, ?, ?)",
  [freshwater.lastID, "Poison Dart Frog", "A brightly coloured rainforest frog that lives near humid freshwater habitats."]
);

  console.log("AquaVerse database created with zones and exhibits.");
  process.exit(0);
}

// Run the database setup function
setup();
