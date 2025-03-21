const express = require("express");
const router = express.Router();
const EventsController = require("./events.controller");

router.post("/assign", EventsController.assignVolunteer);

module.exports = router;
