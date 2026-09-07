// Import the Express framework
import express from "express";

// Import database helper functions
import { get, all, run } from "./database/db.mjs";

// Create the Express application
const app = express();

// Set the port number the server will run on
const PORT = 5000;

// Tell Express to use EJS as the template engine
app.set("view engine", "ejs");

// Tell Express where to find the view files
app.set("views", "views");

// Serve static files (CSS, images, JS) from the public folder
app.use(express.static("public"));

// Read data sent from HTML forms
app.use(express.urlencoded({ extended: false }));

// Define the homepage route
app.get("/", (req, res) => {
  res.render("home");
});

// Define the FAQ page route
app.get("/faq", (req, res) => {
  res.render("faq");
});

// Define the contact page route
app.get("/contact", (req, res) => {
  res.render("contact", {
    errorMessage: "",
    successMessage: ""
  });
});

// Receive and validate the contact form data
app.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;

  // Check that every form field has a value
  if (!name || !email || !message) {
    res.status(400).render("contact", {
      errorMessage: "Please complete all fields before sending your message.",
      successMessage: ""
    });
    return;
  }

  // Save the message using a parameterised query
  await run(
    "INSERT INTO messages (name, email, message) VALUES (?, ?, ?)",
    [name, email, message]
  );

  // Show confirmation after the message is saved
  res.render("contact", {
    errorMessage: "",
    successMessage: "Thank you. Your message has been sent successfully."
  });
});

// Define the Shark Dive page route
app.get("/shark-dive", (req, res) => {
  res.render("experience", {
    title: "Shark Dive",
    description: "Learn about the sharks that live at Aquarium World and the care they receive from our expert team.",
    details: "This experience introduces visitors to shark habitats, feeding routines and conservation. It is designed to help visitors understand these important ocean animals.",
    information: "Please speak to an Aquarium World team member on arrival for current safety guidance and experience availability."
  });
});

// Define the Underwater Tunnel page route
app.get("/tunnel", (req, res) => {
  res.render("experience", {
    title: "Underwater Tunnel",
    description: "Walk through our underwater tunnel and see aquarium animals swimming all around you.",
    details: "The tunnel gives visitors a clear view of colourful fish, rays and larger ocean animals as they move through the aquarium habitat.",
    information: "The Underwater Tunnel is included in the normal visitor route and is suitable for visitors of all ages."
  });
});

// Define the 4D Cinema page route
app.get("/cinema", (req, res) => {
  res.render("experience", {
    title: "4D Cinema",
    description: "Experience the ocean through an immersive short film in the Aquarium World 4D Cinema.",
    details: "The cinema combines ocean footage, sound and sensory effects to help visitors discover marine habitats in an engaging way.",
    information: "Please check the daily information board inside Aquarium World for the current cinema schedule."
  });
});

// Define the Plan Your Visit page route
app.get("/visit", async (req, res) => {
  // Get weekly opening hours from the database
  const openingHours = await all(
    "SELECT * FROM opening_hours ORDER BY display_order"
  );

  // Render the page with opening hours data
  res.render("visit", { openingHours });
});

// Define the Guess the Fish page route
app.get("/guess-the-fish", (req, res) => {
  res.render("guess-the-fish");
});

// Define the Animal Search page route
app.get("/animal-search", (req, res) => {
  res.render("animal-search");
});

// Return matching aquarium animals as JSON data
app.get("/api/exhibits", async (req, res) => {
  const searchTerm = req.query.query || "";

  // Return no results when the search box is empty
  if (searchTerm.trim() === "") {
    res.json([]);
    return;
  }

  const exhibits = await all(
    `SELECT exhibits.name, exhibits.description, zones.name AS zone_name, zones.slug AS zone_slug
     FROM exhibits
     JOIN zones ON exhibits.zone_id = zones.id
     WHERE exhibits.name LIKE ?
     ORDER BY exhibits.name`,
    [`%${searchTerm}%`]
  );

  res.json(exhibits);
});


// Define dynamic routes for aquarium zones
app.get("/zone/:slug", async (req, res) => {
  const zone = await get(
    "SELECT * FROM zones WHERE slug = ?",
    [req.params.slug]
  );

  // Show the custom 404 page when a zone does not exist
  if (!zone) {
    res.status(404).render("404");
    return;
  }

  // Get exhibits belonging to the selected zone
  const exhibits = await all(
    "SELECT * FROM exhibits WHERE zone_id = ?",
    [zone.id]
  );

  res.render("zone", { zone, exhibits });
});

// Show the custom 404 page for an unknown route
app.use((req, res) => {
  res.status(404).render("404");
});

// Start the server and listen for requests
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}` );
});
