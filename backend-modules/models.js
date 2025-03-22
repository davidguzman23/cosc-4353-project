const mongoose = require("mongoose");

// User Schema
const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    role: { type: String, enum: ["MANAGER", "VOLUNTEER"], required: true },
    password: { type: String, required: true },
}, { timestamps: true });

// Profile Schema
const ProfileSchema = new mongoose.Schema({
    email: { type: String, required: true, ref: "User", unique: true },
    full_name: { type: String, maxlength: 50, required: true },
    address_1: { type: String, maxlength: 100, required: true },
    address_2: { type: String, maxlength: 100 },
    city: { type: String, maxlength: 100, required: true },
    state: { type: String, length: 2, required: true },
    zip: { type: String, match: /^[0-9]{5,9}$/, required: true },
    skills: { type: String, required: true },
    preferences: { type: String },
    availability: { type: [Date], required: true },
}, { timestamps: true });

// Event Schema
const EventSchema = new mongoose.Schema({
    name: { type: String, maxlength: 100, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    skills: { type: [String], required: true },
    urgency: { type: String, enum: ["LOW", "MEDIUM", "HIGH"], required: true },
    date: { type: Date, required: true },
}, { timestamps: true });

// Notification Schema
const NotificationSchema = new mongoose.Schema({
    email: { type: String, required: true, ref: "User" },
    message: { type: String, required: true },
    date: { type: Date, default: Date.now, required: true },
    type: { type: String, enum: ["SUCCESS", "WARNING", "ERROR"], required: true },
}, { timestamps: true });

// Volunteer Schema (Many-to-Many between User and Event)
const VolunteerSchema = new mongoose.Schema({
    email: { type: String, required: true, ref: "User" },
    event_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Event" },
}, { timestamps: true });

// Export Models
const User = mongoose.model("User", UserSchema);
const Profile = mongoose.model("Profile", ProfileSchema);
const Event = mongoose.model("Event", EventSchema);
const Notification = mongoose.model("Notification", NotificationSchema);
const Volunteer = mongoose.model("Volunteer", VolunteerSchema);

module.exports = { User, Profile, Event, Notification, Volunteer };
