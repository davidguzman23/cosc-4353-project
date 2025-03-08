const { sendNotification } = require("../notifications/notifications.socket");

const events = [
    { id: "101", name: "Charity Walk" },
    { id: "102", name: "Food Drive" },
];

exports.assignVolunteer = (req, res) => {
    const { eventId, volunteerId } = req.body;
    const event = events.find((e) => e.id === eventId);

    if (!event) return res.status(404).json({ error: "Event not found" });

    sendNotification(volunteerId, `You have been assigned to ${event.name}`);

    res.json({ success: true, message: "Volunteer assigned and notified." });
};
