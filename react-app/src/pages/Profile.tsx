import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Paper,
  Typography,
  Avatar,
  Box,
  List,
  ListItem,
  ListItemText,
  Divider,
  FormHelperText,
} from "@mui/material";

const VolunteerProfile = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    skills: [],
    preferences: "",
    availability: "",
  });

  const states = [
    { code: "AL", name: "Alabama" },
    { code: "AK", name: "Alaska" },
    { code: "AZ", name: "Arizona" },
    { code: "AR", name: "Arkansas" },
    { code: "CA", name: "California" },
    { code: "CO", name: "Colorado" },
    { code: "CT", name: "Connecticut" },
    { code: "DE", name: "Delaware" },
    { code: "FL", name: "Florida" },
    { code: "GA", name: "Georgia" },
    { code: "HI", name: "Hawaii" },
    { code: "ID", name: "Idaho" },
    { code: "IL", name: "Illinois" },
    { code: "IN", name: "Indiana" },
    { code: "IA", name: "Iowa" },
    { code: "KS", name: "Kansas" },
    { code: "KY", name: "Kentucky" },
    { code: "LA", name: "Louisiana" },
    { code: "ME", name: "Maine" },
    { code: "MD", name: "Maryland" },
    { code: "MA", name: "Massachusetts" },
    { code: "MI", name: "Michigan" },
    { code: "MN", name: "Minnesota" },
    { code: "MS", name: "Mississippi" },
    { code: "MO", name: "Missouri" },
    { code: "MT", name: "Montana" },
    { code: "NE", name: "Nebraska" },
    { code: "NV", name: "Nevada" },
    { code: "NH", name: "New Hampshire" },
    { code: "NJ", name: "New Jersey" },
    { code: "NM", name: "New Mexico" },
    { code: "NY", name: "New York" },
    { code: "NC", name: "North Carolina" },
    { code: "ND", name: "North Dakota" },
    { code: "OH", name: "Ohio" },
    { code: "OK", name: "Oklahoma" },
    { code: "OR", name: "Oregon" },
    { code: "PA", name: "Pennsylvania" },
    { code: "RI", name: "Rhode Island" },
    { code: "SC", name: "South Carolina" },
    { code: "SD", name: "South Dakota" },
    { code: "TN", name: "Tennessee" },
    { code: "TX", name: "Texas" },
    { code: "UT", name: "Utah" },
    { code: "VT", name: "Vermont" },
    { code: "VA", name: "Virginia" },
    { code: "WA", name: "Washington" },
    { code: "WV", name: "West Virginia" },
    { code: "WI", name: "Wisconsin" },
    { code: "WY", name: "Wyoming" },
  ];

  const skills = [
    "Tutoring",
    "Teaching",
    "Mentoring",
    "Fundraising",
    "EventPlanning",
    "PublicSpeaking",
    "WritingEditing",
    "GraphicDesign",
    "SocialMediaManagement",
    "CommunityOutreach",
    "DisasterRelief",
    "FoodPreparation",
    "HealthcareSupport",
    "Childcare",
    "ElderlyAssistance",
    "AnimalCare",
    "EnvironmentalCleanup",
    "LegalAssistance",
    "Translation",
    "TechSupport",
    "Photography",
    "MusicPerformance",
    "SportsCoaching",
    "MentalHealthSupport",
    "ConflictResolution",
    "AdministrativeSupport",
    "Transportation",
  ];

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let newErrors = {};

    if (!formData.fullName || formData.fullName.length > 50) {
      newErrors.fullName = "Full Name is required (max 50 characters)";
    }

    if (!formData.address1 || formData.address1.length > 100) {
      newErrors.address1 = "Address 1 is required (max 100 characters)";
    }

    if (formData.address2.length > 100) {
      newErrors.address2 = "Address 2 should not exceed 100 characters";
    }

    if (!formData.city || formData.city.length > 100) {
      newErrors.city = "City is required (max 100 characters)";
    }

    if (!formData.state) {
      newErrors.state = "State selection is required";
    }

    if (!/^\d{5}(-\d{4})?$/.test(formData.zip)) {
      newErrors.zip = "Zip code must be at least 5 digits, max 9 digits";
    }

    if (!formData.skills.length) {
      newErrors.skills = "At least one skill must be selected";
    }

    if (!formData.availability) {
      newErrors.availability = "Availability date is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSkillsChange = (event) => {
    setFormData({ ...formData, skills: event.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted successfully", formData);
    }
  };

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
          <span style={{ cursor: "pointer" }}>Sign Out</span>
          <span style={{ cursor: "pointer", fontSize: "20px" }}>🔔</span>
        </div>
      </div>

      <Box sx={{ display: "flex", width: "100vw", height: "100vh" }}>
        {/* 🔹 Sidebar */}
        <Paper sx={{ width: 250, padding: 2, height: "100vh" }}>
          <Avatar sx={{ width: 80, height: 80, margin: "auto" }} />
          <Typography variant="h6" align="center" sx={{ mt: 1 }}>
            {formData.fullName || "User Name"}
          </Typography>
          <Divider sx={{ my: 2 }} />
          <List>
            <ListItem button>
              <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem button>
              <ListItemText primary="Events" />
            </ListItem>
            <ListItem button>
              <ListItemText primary="History" />
            </ListItem>
            <ListItem button>
              <ListItemText primary="Profile" />
            </ListItem>
          </List>
        </Paper>

        {/* 🔹 Main Content */}
        <Box sx={{ flex: 1, padding: 4 }}>
          <Typography variant="h5" sx={{ mb: 3 }}>
            Volunteer Profile Management
          </Typography>

          <Paper elevation={3} sx={{ padding: 3 }}>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                {/* Full Name */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    error={!!errors.fullName}
                    helperText={errors.fullName}
                  />
                </Grid>

                {/* Address */}
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Address 1"
                    name="address1"
                    value={formData.address1}
                    onChange={handleChange}
                    error={!!errors.address1}
                    helperText={errors.address1}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Address 2"
                    name="address2"
                    value={formData.address2}
                    onChange={handleChange}
                    error={!!errors.address2}
                    helperText={errors.address2}
                  />
                </Grid>

                {/* City & State */}
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="City"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    error={!!errors.city}
                    helperText={errors.city}
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormControl fullWidth error={!!errors.state}>
                    <InputLabel>Select a state</InputLabel>
                    <Select name="state" value={formData.state} onChange={handleChange}>
                    {states.map((state) => (
                        <MenuItem key={state.code} value={state.code}>
                        {state.name}
                        </MenuItem>
                    ))}
                    </Select>
                    <FormHelperText>{errors.state}</FormHelperText>
                  </FormControl>
                </Grid>

                {/* Zip Code & Skills */}
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Zip-Code"
                    name="zip"
                    value={formData.zip}
                    onChange={handleChange}
                    error={!!errors.zip}
                    helperText={errors.zip}
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormControl fullWidth error={!!errors.skills}>
                    <InputLabel>Select skills</InputLabel>
                    <Select multiple name="skills" value={formData.skills} onChange={handleSkillsChange}>
                    {skills.map((skill) => (
                        <MenuItem key={skill} value={skill}>
                        {skill.replace(/([A-Z])/g, " $1").trim()}
                        </MenuItem>
                    ))}
                    </Select>
                    <FormHelperText>{errors.skills}</FormHelperText>
                  </FormControl>
                </Grid>

                {/* Preferences & Availability */}
                <Grid item xs={12}>
                  <TextField fullWidth label="Preferences" name="preferences" value={formData.preferences} onChange={handleChange} />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Availability"
                    type="date"
                    name="availability"
                    value={formData.availability}
                    onChange={handleChange}
                    InputLabelProps={{ shrink: true }}
                    error={!!errors.availability}
                    helperText={errors.availability}
                  />
                </Grid>

                {/* Submit Button */}
                <Grid item xs={12}>
                  <Button type="submit" variant="contained" color="success" fullWidth>
                    Update
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Box>
      </Box>
    </div>
  );
};

export default VolunteerProfile;
