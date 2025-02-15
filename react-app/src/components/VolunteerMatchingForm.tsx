import React, { useState } from "react";

// Mock Data for Volunteers
const volunteers = [
  { name: "John Doe", skills: "First Aid, CPR", available: "Weekends" },
  { name: "Jane Smith", skills: "Organizing, Fundraising", available: "Weekdays" },
];

// Mock Data for Events
const events = [
  { 
    name: "Blood Donation Drive", 
    description: "A community blood donation event.",
    requiredSkills: "First Aid, CPR"
  },
  { 
    name: "Food Drive", 
    description: "Collecting and distributing food to the needy.",
    requiredSkills: "Organizing, Fundraising"
  }
];

const VolunteerMatchingForm: React.FC = () => {
  const [selectedVolunteer, setSelectedVolunteer] = useState<string>("");
  const [selectedEvent, setSelectedEvent] = useState<string>("");

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      {/* Select Volunteer Dropdown */}
      <label>Select a Volunteer:</label>
      <select 
        value={selectedVolunteer} 
        onChange={(e) => setSelectedVolunteer(e.target.value)}
        style={{ width: "100%", padding: "8px", fontSize: "16px" }}
      >
        <option value="">-- Choose Volunteer --</option>
        {volunteers.map((volunteer, index) => (
          <option key={index} value={volunteer.name}>
            {volunteer.name}
          </option>
        ))}
      </select>

      {/* Show Volunteer Details */}
      {selectedVolunteer && (
        <div style={{ padding: "10px", border: "1px solid black", borderRadius: "5px", backgroundColor: "#f9f9f9" }}>
          <h3>{selectedVolunteer}</h3>
          <p><strong>Skills:</strong> {volunteers.find((v) => v.name === selectedVolunteer)?.skills}</p>
          <p><strong>Availability:</strong> {volunteers.find((v) => v.name === selectedVolunteer)?.available}</p>

          {/* Event Selection Dropdown */}
          <label>Select an Event:</label>
          <select 
            value={selectedEvent} 
            onChange={(e) => setSelectedEvent(e.target.value)}
            style={{ width: "100%", padding: "8px", fontSize: "16px" }}
          >
            <option value="">-- Choose Event --</option>
            {events.map((event, index) => (
              <option key={index} value={event.name}>
                {event.name} - {event.description} (Skills: {event.requiredSkills})
              </option>
            ))}
          </select>

          {/* Show Selected Event Details */}
          {selectedEvent && (
            <div style={{ marginTop: "10px", padding: "10px", border: "1px solid black", borderRadius: "5px", backgroundColor: "#eef3ff" }}>
              <h3>Selected Event: {selectedEvent}</h3>
              <p><strong>Description:</strong> {events.find((e) => e.name === selectedEvent)?.description}</p>
              <p><strong>Required Skills:</strong> {events.find((e) => e.name === selectedEvent)?.requiredSkills}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default VolunteerMatchingForm;
