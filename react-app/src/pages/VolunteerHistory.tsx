import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import NotificationPopup from '../components/Notifications';

const VolunteerHistory = () => {
    const volunteerHistory = [
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
          },
      ];

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