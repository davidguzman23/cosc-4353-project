import React, { useState } from "react";

const EventManagementForm: React.FC = () => {
  const [eventData, setEventData] = useState({
    name: "",
    description: "",
    location: "",
    requiredSkills: "",
    urgency: "",
    date: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Event Created: ${eventData.name}`);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <input type="text" name="name" placeholder="Event Name" value={eventData.name} onChange={handleChange} required />
      <textarea name="description" placeholder="Event Description" value={eventData.description} onChange={handleChange} required />
      <input type="text" name="location" placeholder="Location" value={eventData.location} onChange={handleChange} required />
      <input type="text" name="requiredSkills" placeholder="Required Skills" value={eventData.requiredSkills} onChange={handleChange} required />
      <select name="urgency" value={eventData.urgency} onChange={handleChange} required>
        <option value="">Select Urgency</option>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      <input type="date" name="date" value={eventData.date} onChange={handleChange} required />
      <button type="submit">Create Event</button>
    </form>
  );
};

export default EventManagementForm;
