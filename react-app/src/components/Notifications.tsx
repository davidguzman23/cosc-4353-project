import React, { useState, useEffect } from "react";
import {
  IconButton,
  Badge,
  Popover,
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Box,
  Button,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WarningIcon from "@mui/icons-material/Warning";
import ErrorIcon from "@mui/icons-material/Error";
import axios from 'axios';

const NotificationPopup = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [notifications, setNotifications] = useState<{ id: number, message: string, time: string, type: string}[]>([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/notifications")
      .then(response => setNotifications(response.data))
      .catch(error => console.error("Error fetching notifications:", error));
  }, []);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <IconButton color="inherit" onClick={handleOpen}>
        <Badge badgeContent={notifications.length} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Card sx={{ width: 300 }}>
          <CardContent>
            <Typography variant="h6">Notifications</Typography>
            <Divider sx={{ my: 1 }} />
            <List>
              {notifications.map((notification) => (
                <ListItem key={notification.id}>
                  <ListItemIcon>
                    {notification.type === "success" ? (
                      <CheckCircleIcon color="success" />
                    ) : notification.type === "warning" ? (
                      <WarningIcon color="warning" />
                    ) : (
                      <ErrorIcon color="error" />
                    )}
                  </ListItemIcon>
                  <ListItemText
                    primary={notification.message}
                    secondary={notification.time}
                  />
                </ListItem>
              ))}
            </List>
            <Divider />
            <Box sx={{ display: "flex", justifyContent: "center", p: 1 }}>
              <Button size="small" color="primary">View All</Button>
            </Box>
          </CardContent>
        </Card>
      </Popover>
    </>
  );
};

export default NotificationPopup;