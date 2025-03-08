const WebSocket = require("ws");

const clients = new Map(); // Store connected users

const initWebSocketServer = (server) => {
    const wss = new WebSocket.Server({ server });

    wss.on("connection", (ws, req) => {
        const userId = req.headers["user-id"];
        clients.set(userId, ws);
        console.log(`User ${userId} connected`);

        ws.on("close", () => {
            clients.delete(userId);
            console.log(`User ${userId} disconnected`);
        });
    });
};

const sendNotification = (userId, message) => {
    const client = clients.get(userId);
    if (client) {
        client.send(JSON.stringify({ message }));
    }
};

module.exports = { initWebSocketServer, sendNotification };
