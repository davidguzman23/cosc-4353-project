const express = require("express");
const http = require("http");
const cors = require("cors");

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5001;

// 🔹 Hardcoded Events (No Database Yet)
let events = [
  {
    id: 1,
    title: "Community Clean-Up",
    location: "Downtown Park",
    skills_required: ["Teamwork", "Trash Collection"],
    urgency: "Medium",
    details: "Help clean up the park and improve our environment.",
    date: "2025-03-10"
  },
  {
    id: 2,
    title: "Food Drive",
    location: "Community Center",
    skills_required: ["Cooking", "Organization"],
    urgency: "High",
    details: "Distributing food to families in need.",
    date: "2025-03-15"
  }
];

// 🔹 Hardcoded Volunteers (No Database Yet)
let volunteers = [
  {
    id: 1,
    name: "John Doe",
    skills: ["Cooking", "Organization"],
    location: "Community Center",
    availability: ["Weekends"]
  },
  {
    id: 2,
    name: "Jane Smith",
    skills: ["Teamwork", "Trash Collection"],
    location: "Downtown Park",
    availability: ["Weekdays"]
  }
];

// 🔹 Validation Functions
const validateEvent = (event) => {
    let errors = {};
    if (!event.title || event.title.trim() === "") errors.title = "Title is required";
    if (!event.location || event.location.trim() === "") errors.location = "Location is required";
    if (!event.skills_required || !Array.isArray(event.skills_required) || event.skills_required.length === 0)
  errors.skills_required = "At least one skill is required";

    if (!event.details || event.details.trim() === "") errors.details = "Details cannot be empty";
    if (!event.date || event.date.trim() === "") errors.date = "Date is required";
    if (!event.urgency || !["Low", "Medium", "High"].includes(event.urgency))
      errors.urgency = "Urgency is required";
    return errors;
};

const validateVolunteer = (volunteer) => {
  let errors = {};
  if (!volunteer.name || volunteer.name.trim() === "") errors.name = "Name is required";
  if (!volunteer.skills || !Array.isArray(volunteer.skills) || volunteer.skills.length === 0)
    errors.skills = "At least one skill is required";
  if (!volunteer.location || volunteer.location.trim() === "") errors.location = "Location is required";
  if (!volunteer.availability || !Array.isArray(volunteer.availability) || volunteer.availability.length === 0)
    errors.availability = "Availability is required";
  return errors;
};

// 🔹 API: Get All Events
app.get("/api/events", (req, res) => {
  res.json(events);
});

// 🔹 API: Create a New Event
app.post("/api/events", (req, res) => {
  let errors = validateEvent(req.body);
  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  }

  const newEvent = {
    id: events.length + 1,
    ...req.body
  };

  events.push(newEvent);
  res.status(201).json({ message: "Event created successfully!", event: newEvent });
});

// 🔹 API: Delete an Event
app.delete("/api/events/:id", (req, res) => {
  const eventId = parseInt(req.params.id);
  const eventExists = events.some(event => event.id === eventId);

  if (!eventExists) {
    return res.status(404).json({ message: "Event not found" });
  }

  events = events.filter(event => event.id !== eventId);
  res.json({ message: "Event deleted successfully" });
});

// 🔹 API: Get All Volunteers
app.get("/api/volunteers", (req, res) => {
  res.json(volunteers);
});

// 🔹 API: Register a Volunteer
app.post("/api/volunteers", (req, res) => {
  let errors = validateVolunteer(req.body);
  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  }

  const newVolunteer = {
    id: volunteers.length + 1,
    ...req.body
  };

  volunteers.push(newVolunteer);
  res.status(201).json({ message: "Volunteer registered successfully!", volunteer: newVolunteer });
});

// 🔹 API: Match Volunteers to Events
app.get("/api/match-volunteers", (req, res) => {
  let matches = [];

  volunteers.forEach(volunteer => {
    events.forEach(event => {
      const hasMatchingSkills = volunteer.skills.some(skill => event.skills_required.includes(skill));
      const isNearby = volunteer.location === event.location;

      if (hasMatchingSkills && isNearby) {
        matches.push({ volunteer: volunteer.name, event: event.title });
      }
    });
  });

  if (matches.length === 0) {
    return res.status(404).json({ message: "No matching volunteers found" });
  }

  res.json({ matches });
});

// 🔹 Clear All Volunteers
app.delete("/api/clear-volunteers", (req, res) => {
  volunteers.length = 0; // ✅ Properly clears the array
  console.log("✅ All volunteers cleared!");
  res.json({ message: "All volunteers deleted" });
});

// 🔹 Clear All Events
app.delete("/api/clear-events", (req, res) => {
  events.length = 0; // ✅ Properly clears the array
  console.log("✅ All events cleared!");
  res.json({ message: "All events deleted" });
});

// 🔹 Start Server (Only if NOT in Test Mode)
if (process.env.NODE_ENV !== "test") {
  server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

// ✅ Export `app` for testing
module.exports = app;
