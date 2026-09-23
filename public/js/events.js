// Find the Events page controls and result areas
const yearFilter = document.getElementById("year-filter");
const categoryFilter = document.getElementById("category-filter");
const eventsStatus = document.getElementById("events-status");
const eventsList = document.getElementById("events-list");

// Store one local image for each general event category
const eventCategoryImages = {
  "Conservation Workshop": "/images/aquarium-events/conservation-workshops.png",
  "After-Dark Tour": "/images/aquarium-events/after-dark-tour.png",
  "Family Activity": "/images/aquarium-events/family-activities.png",
  "Educational Talk": "/images/aquarium-events/educational-talks.png",
  "Seasonal Celebration": "/images/aquarium-events/seasonal-celebration.png"
};

// Choose the correct image for each event
function getEventImage(event) {
  // Use the Christmas image for both Christmas events
  if (event.title.includes("Christmas")) {
    return "/images/aquarium-events/christmas.png";
  }

  // Use the category image for all other events
  return eventCategoryImages[event.category];
}

// Format a database date clearly for visitors
function formatEventDate(eventDate) {
  const date = new Date(`${eventDate}T12:00:00`);

  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
}

// Request matching events from the Express API using AJAX
async function loadEvents() {
  const selectedYear = yearFilter.value;
  const selectedCategory = categoryFilter.value || "all";

  eventsStatus.textContent = "Loading events...";
  eventsList.innerHTML = "";

  try {
    const response = await fetch(
      `/api/events?year=${encodeURIComponent(selectedYear)}&category=${encodeURIComponent(selectedCategory)}`
    );

    if (!response.ok) {
      throw new Error("Events could not be loaded.");
    }

    const events = await response.json();

    // Explain when no events match the selected filters
    if (events.length === 0) {
      eventsStatus.textContent = "No events match the selected year and category.";
      return;
    }

    // Announce the number of loaded events
    eventsStatus.textContent =
      `Showing ${events.length} event${events.length === 1 ? "" : "s"} for ${selectedYear}.`;

    // Display one card for each event returned by the database
    eventsList.innerHTML = events.map(event => {
      const imagePath = getEventImage(event);

      return `
        <article class="event-card">
          <img
            class="event-image"
            src="${imagePath}"
            alt=""
          >
          <p class="event-meta">${formatEventDate(event.event_date)} · ${event.category}</p>
          <h2>${event.title}</h2>
          <p>${event.summary}</p>
        </article>
      `;
    }).join("");
  } catch (error) {
    eventsStatus.textContent =
      "Events are unavailable at the moment. Please try again later.";
  }
}

// Reload Events without refreshing the page when a filter changes
if (yearFilter && categoryFilter && eventsStatus && eventsList) {
  yearFilter.addEventListener("change", loadEvents);
  categoryFilter.addEventListener("change", loadEvents);

  // Load current-year events when the page opens
  loadEvents();
}
