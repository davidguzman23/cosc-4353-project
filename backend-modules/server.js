const cors = require("cors");
const express = require("express");
const connectDB = require("./db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { User, Profile, Event, Notification, Volunteer } = require("./models");

const app = express();

const corsOptions = {
  origin: "http://localhost:5173", 
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization",
  credentials: true
};
app.use(cors(corsOptions));
app.use(express.json()); // Middleware to parse JSON

// Connect to MongoDB
connectDB();

// Routes

// Get all users
app.get("/users", async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Get all profiles
app.get("/profiles", async (req, res) => {
    try {
        const profiles = await Profile.find();
        res.json(profiles);
    } catch (error) {
        console.error("Error fetching profiles:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Get all events
app.get("/events", async (req, res) => {
    try {
        const events = await Event.find();
        res.json(events);
    } catch (error) {
        console.error("Error fetching events:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Get all notifications
app.get("/notifications", async (req, res) => {
    try {
        const notifications = await Notification.find();
        res.json(notifications);
    } catch (error) {
        console.error("Error fetching notifications:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Get all volunteers
app.get("/volunteers", async (req, res) => {
    try {
        const volunteers = await Volunteer.find();
        res.json(volunteers);
    } catch (error) {
        console.error("Error fetching volunteers:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});






app.post("/signup", async (req, res) => {
  const { email, password, role } = req.body;

  // Check if the user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
  }

  // Hash password before saving it
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create a new user
  const newUser = new User({
      email,
      password: hashedPassword,
      role
  });

  try {
      await newUser.save();
      res.status(201).json({ message: "User created successfully" });
  } catch (error) {
      res.status(500).json({ message: "Error creating user", error });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        
        if (!user) {
            return res.status(400).json({ error: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user._id, role: user.role }, 'your_jwt_secret', { expiresIn: '1h' });

        res.json({
            email: user.email,
            role: user.role,
            token: token
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});





// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
