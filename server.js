const express = require("express");
const path = require("path");
const app = require("./app");
const bodyParser = require('body-parser');
const port = 3000;

app.use(express.static(path.join(__dirname, "static")));
app.use(bodyParser.json());

let rooms = []; // This will store created rooms

// Handle room creation
app.post('/create-room', (req, res) => {
    const { roomName } = req.body;

    if (rooms.includes(roomName)) {
        return res.status(400).json({ error: 'Room already exists' });
    }

    // Add room to the list of rooms
    rooms.push(roomName);
    return res.json({ success: 'Room created successfully' });
});

// Handle room checking
app.post('/check-room', (req, res) => {
    const { roomName } = req.body;

    // Check if the room exists
    if (rooms.includes(roomName)) {
        return res.json({ success: 'Room exists' });
    } else {
        return res.status(404).json({ error: 'Room does not exist' });
    }
});

app.listen(port, function () {
  console.log(`Chat App running on http://localhost:${port}/`);
});
