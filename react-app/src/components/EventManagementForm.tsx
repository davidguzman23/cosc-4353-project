import React, { useState, useEffect } from "react";
import axios from "axios";

const EventManagementForm: React.FC = () => {
  type EventType = {
    _id: string; // MongoDB uses _id, not id
    title: string;
    details: string;
    location: string;
    skills_required: string[];
    urgency: string;
    date: string;
  };

  const [events, setEvents] = useState<EventType[]>([]);
  const [eventData, setEventData] = useState<EventType>({
    _id: "", // This is ignored when sending data to the backend
    title: "",
    details: "",
    location: "",
    skills_required: [],
    urgency: "",
    date: "",
  });

  const [error, setError] = useState("");

  // Fetch existing events on component mount
  useEffect(() => {
    axios
      .get("http://localhost:5001/api/events")
      .then((response) => {
        console.log("Fetched events:", response.data); // Debugging
        setEvents(response.data);
      })
      .catch((error) => console.error("Error fetching events:", error));
  }, []);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setEventData((prevData) => ({
      ...prevData,
      [name]: name === "skills_required" ? value.split(",").map((skill) => skill.trim()) : value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    // Ensure all fields are correctly validated
    if (
      !eventData.title.trim() ||
      !eventData.details.trim() ||
      !eventData.location.trim() ||
      eventData.skills_required.length === 0 ||
      !eventData.urgency ||
      !eventData.date
    ) {
      setError("All fields are required, including at least one skill!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5001/api/events", eventData);
      console.log("Created event:", response.data); // Debugging
      setEvents([...events, response.data.event]);
      setEventData({
        _id: "", // Reset after submission
        title: "",
        details: "",
        location: "",
        skills_required: [],
        urgency: "",
        date: "",
      });
    } catch (error: any) {
      console.error("Error creating event:", error);
      if (error.response && error.response.data.errors) {
        setError(Object.values(error.response.data.errors).join(", "));
      }
    }
  };

  // Handle event deletion
  const handleDelete = async (eventId: string) => {
    try {
      console.log("Deleting event with ID:", eventId); // Debugging
      await axios.delete(`http://localhost:5001/api/events/${eventId}`);
      setEvents(events.filter((event) => event._id !== eventId));
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  return (
    <div>
      <h3>Event Management</h3>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Event Creation Form */}
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <input type="text" name="title" placeholder="Event Title" value={eventData.title} onChange={handleChange} required />
        <textarea name="details" placeholder="Event Details" value={eventData.details} onChange={handleChange} required />
        <input type="text" name="location" placeholder="Location" value={eventData.location} onChange={handleChange} required />

        {/* Skills Input */}
        <input
          type="text"
          name="skills_required"
          placeholder="Required Skills (comma-separated)"
          value={eventData.skills_required.join(", ")}
          onChange={handleChange}
          required
        />

        <select name="urgency" value={eventData.urgency} onChange={handleChange} required>
          <option value="">Select Urgency</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <input type="date" name="date" value={eventData.date} onChange={handleChange} required />
        <button type="submit">Create Event</button>
      </form>

      {/* Display Existing Events */}
      <h3>Existing Events</h3>
      <ul>
        {events.map((event) => (
          <li key={event._id}>
            <strong>{event.title}</strong> - {event.location} ({event.urgency})
            <br />
            <button onClick={() => handleDelete(event._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventManagementForm;
