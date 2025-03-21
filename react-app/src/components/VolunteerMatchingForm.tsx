import React, { useState, useEffect } from "react";
import axios from "axios";

const VolunteerMatchingForm: React.FC = () => {
  type VolunteerType = {
    _id: string;
    name: string;
    skills: string[];
    location: string;
  };

  type EventType = {
    _id: string;
    title: string;
    details: string;
    skills_required: string[];
    location: string;
    assigned_volunteers: string[]; // Stores volunteer IDs
  };

  const [volunteers, setVolunteers] = useState<VolunteerType[]>([]);
  const [events, setEvents] = useState<EventType[]>([]);
  const [selectedVolunteer, setSelectedVolunteer] = useState<string | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [matchMessage, setMatchMessage] = useState<string | null>(null);
  const [assignMessage, setAssignMessage] = useState<string | null>(null);

  // Fetch Volunteers
  useEffect(() => {
    axios.get("http://localhost:5001/api/volunteers")
      .then(response => {
        console.log("Fetched volunteers:", response.data);
        setVolunteers(response.data);
      })
      .catch(error => console.error("Error fetching volunteers:", error));
  }, []);

  // Fetch Events
  useEffect(() => {
    axios.get("http://localhost:5001/api/events")
      .then(response => {
        console.log("Fetched events:", response.data);
        setEvents(response.data);
      })
      .catch(error => console.error("Error fetching events:", error));
  }, []);

  // 🔹 Check if the volunteer is a good match for the event
  const handleCheckMatch = async () => {
    if (!selectedVolunteer || !selectedEvent) {
      setMatchMessage("Please select both a volunteer and an event.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5001/api/match-volunteer", {
        volunteerId: selectedVolunteer,
        eventId: selectedEvent,
      });

      setMatchMessage(response.data.message);
    } catch (error) {
      console.error("Error checking match:", error);
      setMatchMessage("Error checking match.");
    }
  };

  // 🔹 Assign Volunteer to the Event
  const handleAssignVolunteer = async () => {
    if (!selectedVolunteer || !selectedEvent) {
      setAssignMessage("Please select both a volunteer and an event.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5001/api/assign-volunteer", {
        volunteerId: selectedVolunteer,
        eventId: selectedEvent,
      });

      setAssignMessage(response.data.message);

      // Update event list to reflect new assignments
      const updatedEvents = events.map(event =>
        event._id === selectedEvent
          ? { ...event, assigned_volunteers: [...event.assigned_volunteers, selectedVolunteer] }
          : event
      );

      setEvents(updatedEvents);
    } catch (error) {
      console.error("Error assigning volunteer:", error);
      setAssignMessage("Error assigning volunteer.");
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <h2>Volunteer Matching</h2>

      {/* Select Volunteer Dropdown */}
      <label>Select a Volunteer:</label>
      <select
        value={selectedVolunteer ?? ""}
        onChange={(e) => setSelectedVolunteer(e.target.value)}
        style={{ width: "100%", padding: "8px", fontSize: "16px" }}
      >
        <option value="">-- Choose Volunteer --</option>
        {volunteers.map((volunteer) => (
          <option key={volunteer._id} value={volunteer._id}>
            {volunteer.name} (Skills: {volunteer.skills.join(", ")})
          </option>
        ))}
      </select>

      {/* Select Event Dropdown */}
      <label>Select an Event:</label>
      <select
        value={selectedEvent ?? ""}
        onChange={(e) => setSelectedEvent(e.target.value)}
        style={{ width: "100%", padding: "8px", fontSize: "16px" }}
      >
        <option value="">-- Choose Event --</option>
        {events.map((event) => (
          <option key={event._id} value={event._id}>
            {event.title} (Assigned: {event.assigned_volunteers.length})
          </option>
        ))}
      </select>

      {/* Buttons for Matching and Assigning */}
      <button onClick={handleCheckMatch} style={{ padding: "10px", fontSize: "16px", cursor: "pointer" }}>
        Check Match
      </button>

      <button onClick={handleAssignVolunteer} style={{ padding: "10px", fontSize: "16px", cursor: "pointer", backgroundColor: "green", color: "white" }}>
        Assign Volunteer
      </button>

      {/* Display Match Result */}
      {matchMessage && (
        <div style={{ padding: "10px", border: "1px solid black", borderRadius: "5px", backgroundColor: "#f9f9f9" }}>
          <h3>Match Result:</h3>
          <p>{matchMessage}</p>
        </div>
      )}

      {/* Display Assign Result */}
      {assignMessage && (
        <div style={{ padding: "10px", border: "1px solid black", borderRadius: "5px", backgroundColor: "#e8f5e9" }}>
          <h3>Assignment Status:</h3>
          <p>{assignMessage}</p>
        </div>
      )}

      <h2>Events and Assigned Volunteers</h2>
      <ul>
        {events.map((event) => (
          <li key={event._id} style={{ marginBottom: "15px", padding: "10px", border: "1px solid gray", borderRadius: "5px" }}>
            <strong>{event.title}</strong> - {event.location}
            <br />
            <span>Skills Required: {event.skills_required.join(", ")}</span>
            <br />
            <strong>Assigned Volunteers:</strong>
            <ul>
              {event.assigned_volunteers.length > 0 ? (
                event.assigned_volunteers.map((volunteerId) => {
                  const matchedVolunteer = volunteers.find(v => v._id === volunteerId);
                  return matchedVolunteer ? <li key={volunteerId}>{matchedVolunteer.name}</li> : null;
                })
              ) : (
                <li>No volunteers assigned</li>
              )}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VolunteerMatchingForm;
