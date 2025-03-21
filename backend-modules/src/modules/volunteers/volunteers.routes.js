const express = require("express");
const router = express.Router();
const VolunteersController = require("./volunteers.controller");

router.get("/", VolunteersController.getVolunteers);

module.exports = router;
