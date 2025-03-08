let notifications = []; // Store notifications in-memory

exports.createNotification = (req, res) => {
    const { userId, message } = req.body;
    const notification = { userId, message, timestamp: new Date() };

    notifications.push(notification);
    res.json({ success: true, notification });
};

exports.getNotifications = (req, res) => {
    const userId = req.params.userId;
    res.json(notifications.filter((n) => n.userId === userId));
};
