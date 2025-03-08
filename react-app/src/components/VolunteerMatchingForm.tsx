import React, { useState, useEffect } from "react";
import axios from "axios";

// let notifications = []; // Store notifications in memory
// let ws = null; // WebSocket connection

// // Initialize WebSocket Connection
// export function initWebSocket() {
//     ws = new WebSocket("ws://localhost:5000");

//     ws.onmessage = (event) => {
//         const notification = JSON.parse(event.data);
//         notifications.push(notification.message);
//         updateNotificationList();
//     };

//     ws.onopen = () => console.log("WebSocket connected");
//     ws.onclose = () => console.log("WebSocket disconnected");
// }

// // Send a notification request to the backend
// export async function sendTestNotification() {
//     try {
//         const response = await fetch("http://localhost:5000/events/assign", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({
//                 eventId: "101",
//                 volunteerId: "1", // Hardcoded volunteer (Alice)
//             }),
//         });

//         if (!response.ok) {
//             throw new Error("Failed to send notification");
//         }

//         alert("Notification triggered!");
//     } catch (error) {
//         console.error("Error sending notification:", error);
//     }
// }

// // Update the notifications list in the UI
// function updateNotificationList() {
//     const listElement = document.getElementById("notificationList");
//     if (listElement) {
//         listElement.innerHTML = ""; // Clear the list
//         notifications.forEach((note) => {
//             const li = document.createElement("li");
//             li.textContent = note;
//             listElement.appendChild(li);
//         });
//     }
// }


const VolunteerMatchingForm: React.FC = () => {
  const [volunteers, setVolunteers] = useState<{ id: number, name: string, skills: string[], location: string }[]>([]);
  const [events, setEvents] = useState<{ id: number, title: string, details: string, skills_required: string, location: string }[]>([]);
  const [selectedVolunteer, setSelectedVolunteer] = useState<number | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null);
  const [matched, setMatched] = useState<string | null>(null);





  




  // 🔹 Fetch Volunteers
  useEffect(() => {
    axios.get("http://localhost:5000/api/volunteers")
      .then(response => setVolunteers(response.data))
      .catch(error => console.error("Error fetching volunteers:", error));
  }, []);

  // 🔹 Fetch Events
  useEffect(() => {
    axios.get("http://localhost:5000/api/events")
      .then(response => setEvents(response.data))
      .catch(error => console.error("Error fetching events:", error));
  }, []);

  // 🔹 Handle Matching Request
  const handleMatch = async () => {
    if (!selectedVolunteer || !selectedEvent) {
      setMatched("Please select both a volunteer and an event.");
      return;
    }

    try {
      const response = await axios.get("http://localhost:5000/api/match-volunteers");
      const matches = response.data.matches;

      const isMatched = matches.some((match: { volunteer: string; event: string }) => 
      match.volunteer === volunteers.find(v => v.id === selectedVolunteer)?.name &&
      match.event === events.find(e => e.id === selectedEvent)?.title
  );  

      setMatched(isMatched ? "This volunteer is a good match for the event!" : "No match found.");
    } catch (error) {
      console.error("Error matching volunteers:", error);
      setMatched("Error checking matches.");
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      {/* Select Volunteer Dropdown */}
      <label>Select a Volunteer:</label>
      <select 
        value={selectedVolunteer ?? ""}
        onChange={(e) => setSelectedVolunteer(Number(e.target.value))}
        style={{ width: "100%", padding: "8px", fontSize: "16px" }}
      >
        <option value="">-- Choose Volunteer --</option>
        {volunteers.map((volunteer) => (
          <option key={volunteer.id} value={volunteer.id}>
            {volunteer.name} (Skills: {volunteer.skills.join(", ")})
          </option>
        ))}
      </select>

      {/* Select Event Dropdown */}
      <label>Select an Event:</label>
      <select 
        value={selectedEvent ?? ""}
        onChange={(e) => setSelectedEvent(Number(e.target.value))}
        style={{ width: "100%", padding: "8px", fontSize: "16px" }}
      >
        <option value="">-- Choose Event --</option>
        {events.map((event) => (
          <option key={event.id} value={event.id}>
            {event.title} (Skills: {event.skills_required})
          </option>
        ))}
      </select>

      {/* Match Button */}
      <button onClick={handleMatch} style={{ padding: "10px", fontSize: "16px", cursor: "pointer" }}>
        Check Match
      </button>

      {/* Display Match Result */}
      {matched && (
        <div style={{ padding: "10px", border: "1px solid black", borderRadius: "5px", backgroundColor: "#f9f9f9" }}>
          <h3>Match Result:</h3>
          <p>{matched}</p>
        </div>
      )}



      {/* <h2>Test WebSocket Notifications</h2>
      <button onclick="sendTestNotification()">Send Notification</button>
      <ul id="notificationList"></ul>

      <script type="module">
          import { initWebSocket, sendTestNotification } from "./notificationsTester.js";

          // Initialize WebSocket on page load
          initWebSocket();
      </script> */}


    </div>
  );
};

export default VolunteerMatchingForm;
