const express = require("express");
const router = express.Router();
const NotificationsController = require("./notifications.controller");

router.post("/", NotificationsController.createNotification);
router.get("/:userId", NotificationsController.getNotifications);

module.exports = router;
