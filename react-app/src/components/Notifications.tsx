import React, { useState } from "react";
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

const notifications = [
  {
    id: 1,
    message: "New volunteer event available!",
    time: "10 minutes ago",
    type: "success",
  },
  {
    id: 2,
    message: "Reminder: Event tomorrow at 10 AM",
    time: "1 hour ago",
    type: "warning",
  },
  {
    id: 3,
    message: "Profile update required!",
    time: "2 hours ago",
    type: "error",
  },
];

const NotificationPopup = () => {
  const [anchorEl, setAnchorEl] = useState(null);

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