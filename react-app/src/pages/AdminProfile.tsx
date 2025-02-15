import React from "react";
import EventManagementForm from "../components/EventManagementForm";
import VolunteerMatchingForm from "../components/VolunteerMatchingForm";

const AdminProfile: React.FC = () => {
  return (
    <div style={{ width: "100vw", height: "100vh", padding: "20px", boxSizing: "border-box" }}>
      
      {/* 🔹 Top Navigation Bar */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 20px",
        borderBottom: "2px solid #ccc",
        marginBottom: "20px"
      }}>
        <div style={{ fontSize: "18px", fontWeight: "bold", cursor: "pointer" }}>Home</div>
        <div style={{ fontSize: "22px", fontWeight: "bold" }}>Volunteer App</div>
        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
          <span style={{ cursor: "pointer" }}>Profile</span>
          <span style={{ cursor: "pointer" }}>Sign Out</span>
          <span style={{ cursor: "pointer", fontSize: "20px" }}>🔔</span>
        </div>
      </div>

      {/* 🔹 Welcome Admin */}
      <div style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "15px" }}>
        Welcome, Admin
      </div>

      {/* 🔹 Main Content (Two Forms Side by Side) */}
      <div style={{ display: "flex", justifyContent: "space-between", gap: "40px" }}>
        
        <div style={{
          flex: 1,
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "10px",
          backgroundColor: "#f8f9fa",
          minHeight: "300px"
        }}>
          <h2>Event Management</h2>
          <EventManagementForm />
        </div>

        <div style={{
          flex: 1,
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "10px",
          backgroundColor: "#f8f9fa",
          minHeight: "300px"
        }}>
          <h2>Volunteer Matching</h2>
          <VolunteerMatchingForm />
        </div>

      </div>
    </div>
  );
};

export default AdminProfile;
