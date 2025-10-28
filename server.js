const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: { origin: "*" } // allow all origins for testing
});

const PORT = 3001;

// Serve a simple route
app.get('/', (req, res) => {
    res.send("Chat server is running");
});

// Handle socket connections
io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    // Listen for chat messages
    socket.on('chatMessage', (msg) => {
        io.emit('chatMessage', msg); // broadcast to all clients
    });

    // Handle disconnect
    socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.id}`);
    });
});

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
