const express = require("express");
const http = require("http");
const cors = require("cors");

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

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

let volunteerHistory = [
  {
      eventName: "Community Cleanup",
      description: "Organizing a neighborhood cleanup to promote a cleaner environment.",
      location: "789 Green St, Houston, TX 77005",
      skills: "teamwork, attention to detail, stamina",
      urgency: "Medium",
      eventDate: "5/10/2024",
      status: "Participated",
    },
    {
      eventName: "Animal Shelter",
      description: "Assisting in caring for rescued animals, including feeding and cleaning.",
      location: "321 Paw Ave, Houston, TX 77006",
      skills: "compassion, patience, physical endurance",
      urgency: "High",
      eventDate: "6/15/2024",
      status: "Registered",
    },
    {
      eventName: "Senior Home Visit",
      description: "Visiting and engaging with elderly residents through conversations and activities.",
      location: "222 Golden Rd, Houston, TX 77007",
      skills: "empathy, communication, active listening",
      urgency: "Low",
      eventDate: "7/5/2024",
      status: "Canceled",
    },
    {
      eventName: "Charity Run",
      description: "Organizing and managing a marathon to raise funds for local charities.",
      location: "555 Sprint St, Houston, TX 77008",
      skills: "event planning, coordination, leadership",
      urgency: "High",
      eventDate: "8/20/2024",
      status: "No show",
    },
    {
      eventName: "Food Drive",
      description: "Collecting and distributing food supplies to families in need.",
      location: "100 Market St, Houston, TX 77009",
      skills: "organization, logistics, teamwork",
      urgency: "High",
      eventDate: "9/15/2024",
      status: "Participated",
    },
    {
      eventName: "Disaster Relief Effort",
      description: "Providing aid and support for families affected by recent natural disasters.",
      location: "45 Relief Ave, Houston, TX 77010",
      skills: "crisis management, problem-solving, first aid",
      urgency: "High",
      eventDate: "10/5/2024",
      status: "Registered",
    },
    {
      eventName: "Mentorship Program",
      description: "Mentoring underprivileged youth and providing educational guidance.",
      location: "678 Learning Ln, Houston, TX 77011",
      skills: "coaching, communication, leadership",
      urgency: "Medium",
      eventDate: "11/12/2024",
      status: "Participated",
    },
    {
      eventName: "Tree Planting Initiative",
      description: "Planting trees to contribute to a greener environment.",
      location: "233 Green Park, Houston, TX 77012",
      skills: "gardening, environmental awareness, teamwork",
      urgency: "Low",
      eventDate: "12/1/2024",
      status: "No show",
    },
    {
      eventName: "Clothing Drive",
      description: "Collecting and distributing warm clothes for the homeless community.",
      location: "789 Shelter St, Houston, TX 77013",
      skills: "logistics, organization, empathy",
      urgency: "High",
      eventDate: "1/20/2025",
      status: "Participated",
    },
    {
      eventName: "Fundraising Gala",
      description: "Organizing a charity gala to raise funds for community projects.",
      location: "111 Grand Ave, Houston, TX 77014",
      skills: "event management, networking, fundraising",
      urgency: "Medium",
      eventDate: "2/15/2025",
      status: "Registered",
    },
    {
      eventName: "Community Tutoring",
      description: "Providing free tutoring sessions for children in low-income neighborhoods.",
      location: "222 Knowledge Blvd, Houston, TX 77015",
      skills: "teaching, patience, problem-solving",
      urgency: "Medium",
      eventDate: "3/8/2025",
      status: "Participated",
    },
    {
      eventName: "Park Restoration",
      description: "Restoring local parks by cleaning, planting, and repairing equipment.",
      location: "300 Parkside Dr, Houston, TX 77016",
      skills: "physical labor, teamwork, environmental awareness",
      urgency: "Low",
      eventDate: "4/3/2025",
      status: "Canceled",
    },
    {
      eventName: "Hospital Assistance",
      description: "Supporting hospital staff with non-medical tasks and comforting patients.",
      location: "888 Wellness Rd, Houston, TX 77017",
      skills: "compassion, organization, patience",
      urgency: "High",
      eventDate: "5/25/2025",
      status: "Registered",
    },
    {
      eventName: "Youth Sports Coaching",
      description: "Coaching kids in various sports activities and promoting fitness.",
      location: "999 Sports Arena, Houston, TX 77018",
      skills: "coaching, motivation, teamwork",
      urgency: "Medium",
      eventDate: "6/10/2025",
      status: "Participated",
    },
    {
      eventName: "Recycling Awareness Campaign",
      description: "Educating the community on the importance of recycling and sustainability.",
      location: "55 Eco St, Houston, TX 77019",
      skills: "public speaking, environmental education, outreach",
      urgency: "Low",
      eventDate: "7/7/2025",
      status: "No show",
    }
]

const notifications = [
    {
        id: 1,
        message: "New volunteer event available!",
        time: "10 minutes ago",
        type: "success",
    },
    {
        id: 2,
        message: "Reminder: Event tomorrow at 10 AM",
        time: "1 hour ago",
        type: "warning",
    },
    {
        id: 3,
        message: "Profile update required!",
        time: "2 hours ago",
        type: "error",
    },
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






app.get("/api/notifications", (req, res) => {
    res.json(notifications);
});

app.post("/api/notifications", (req, res) => {
    const newNotification = {
        id: notifications.length + 1,
        ...req.body
    };

    notifications.push(newNotification);
    res.status(201).json({ message: "Notification created successfully!", notification: newNotification });
});






// 🔹 API: Get All Volunteers
app.get("/api/volunteers", (req, res) => {
  res.json(volunteers);
});

app.get("/api/volunteer-history", (req, res) => {
  res.json(volunteerHistory);
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

// 🔹 Clear All Volunteers History
app.delete("/api/clear-volunteers-history", (req, res) => {
  volunteers_history.length = 0; // ✅ Properly clears the array
  console.log("✅ All volunteers history cleared!");
  res.json({ message: "All volunteers history deleted" });
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
