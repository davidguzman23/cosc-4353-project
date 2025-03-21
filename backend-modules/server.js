require("dotenv").config();
const express = require("express");
const http = require("http");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const server = http.createServer(app);

//CORS Configuration
const corsOptions = {
  origin: "http://localhost:5173", 
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization",
  credentials: true
};
app.use(cors(corsOptions));

// Middleware
app.use(express.json());

const PORT = process.env.PORT || 5001;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/cosc_4353_project";

// Connect to Mongo
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

// Define  Schemas & Models
const EventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  location: { type: String, required: true },
  skills_required: { type: [String], required: true },
  urgency: { type: String, enum: ["Low", "Medium", "High"], required: true },
  details: { type: String, required: true },
  date: { type: Date, required: true },
  assigned_volunteers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Volunteer" }]
});
const Event = mongoose.model("Event", EventSchema);

const VolunteerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  skills: { type: [String], required: true },
  location: { type: String, required: true },
  availability: { type: [String], required: true }
});
const Volunteer = mongoose.model("Volunteer", VolunteerSchema);

const NotificationSchema = new mongoose.Schema({
  message: { type: String, required: true },
  time: { type: String, required: true },
  type: { type: String, required: true }
});
const Notification = mongoose.model("Notification", NotificationSchema);

// Get  Events
app.get("/api/events", async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: "Error fetching events", error: err.message });
  }
});

// Create Event
app.post("/api/events", async (req, res) => {
  try {
    const newEvent = new Event(req.body);
    await newEvent.save();
    res.status(201).json({ message: "Event created successfully!", event: newEvent });
  } catch (err) {
    res.status(400).json({ message: "Error creating event", error: err.message });
  }
});

// Get All Volunteers
app.get("/api/volunteers", async (req, res) => {
  try {
    const volunteers = await Volunteer.find();
    res.json(volunteers);
  } catch (err) {
    res.status(500).json({ message: "Error fetching volunteers", error: err.message });
  }
});

// Register a Volunteer
app.post("/api/volunteers", async (req, res) => {
  try {
    const newVolunteer = new Volunteer(req.body);
    await newVolunteer.save();
    res.status(201).json({ message: "Volunteer registered successfully!", volunteer: newVolunteer });
  } catch (err) {
    res.status(400).json({ message: "Error registering volunteer", error: err.message });
  }
});

// Start Server 
if (process.env.NODE_ENV !== "test") {
  server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

module.exports = app;
