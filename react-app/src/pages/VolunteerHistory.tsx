import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import NotificationPopup from '../components/Notifications';
import axios from "axios";

const VolunteerHistory = () => {
    const [volunteerHistory, setVolunteerHistory] = useState<{ eventName: string, description: string, location: string, skills: string, urgency: string, eventDate: string, status: string }[]>([]);

    // 🔹 Fetch Volunteers
    useEffect(() => {
      axios.get("http://localhost:5000/api/volunteer-history")
        .then(response => setVolunteerHistory(response.data))
        .catch(error => console.error("Error fetching volunteers:", error));
    }, []);

    return (
        <div style={{ width: "100vw", height: "100vh", padding: "20px", boxSizing: "border-box" }}>
            {/* 🔹 Top Navigation Bar */}
            <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "0px 20px",
                borderBottom: "2px solid #ccc",
                marginBottom: "20px"
            }}>
                <div style={{ fontSize: "18px", fontWeight: "bold", cursor: "pointer" }}>Home</div>
                <div style={{ fontSize: "22px", fontWeight: "bold" }}>Homeboy Volunteering</div>
                <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                <span style={{ cursor: "pointer" }}>Profile</span>
                <span style={{ cursor: "pointer" }}>Sign Out</span>
                <NotificationPopup />
                </div>
            </div>

            <TableContainer component={Paper}>
                <Table>
                <TableHead>
                    <TableRow>
                    <TableCell><strong>Event Name</strong></TableCell>
                    <TableCell><strong>Event Description</strong></TableCell>
                    <TableCell><strong>Location</strong></TableCell>
                    <TableCell><strong>Required Skills</strong></TableCell>
                    <TableCell><strong>Urgency</strong></TableCell>
                    <TableCell><strong>Event Date</strong></TableCell>
                    <TableCell><strong>Status</strong></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {volunteerHistory.map((event, index) => (
                    <TableRow key={index}>
                        <TableCell>{event.eventName}</TableCell>
                        <TableCell>{event.description}</TableCell>
                        <TableCell>{event.location}</TableCell>
                        <TableCell>{event.skills}</TableCell>
                        <TableCell>{event.urgency}</TableCell>
                        <TableCell>{event.eventDate}</TableCell>
                        <TableCell>{event.status}</TableCell>
                    </TableRow>
                    ))}
                </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default VolunteerHistory;