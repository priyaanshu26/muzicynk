const express = require('express');
const path = require('path');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

// Serve static files from the Vite build directory if it exists
const distPath = path.join(__dirname, '../dist');
if (require('fs').existsSync(distPath)) {
    app.use(express.static(distPath));
} else {
    console.log('Static files not found at:', distPath);
    app.get('/', (req, res) => {
        res.send('Muzicynk Backend is Running 🚀');
    });
}

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    },
    // Increase max buffer size for audio data
    maxHttpBufferSize: 1e7
});

const rooms = new Map();

function updateRoomCount(roomCode) {
    if (rooms.has(roomCode)) {
        const count = rooms.get(roomCode).participants.size; // Total inclusive of host
        io.to(roomCode).emit('room-count-update', count);
    }
}

io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    // Host creates a room
    socket.on('create-room', (roomCode) => {
        socket.join(roomCode);
        rooms.set(roomCode, { host: socket.id, participants: new Set([socket.id]), state: {} });
        console.log(`Room created: ${roomCode} by host ${socket.id}`);
    });

    // Client joins a room
    socket.on('join-room', (roomCode) => {
        if (rooms.has(roomCode)) {
            socket.join(roomCode);
            rooms.get(roomCode).participants.add(socket.id);
            socket.emit('room-joined', roomCode);

            // Notify host that someone joined
            const hostId = rooms.get(roomCode).host;
            io.to(hostId).emit('participant-joined', socket.id);

            console.log(`User ${socket.id} joined room ${roomCode}`);
            updateRoomCount(roomCode);
        } else {
            socket.emit('error', 'Room not found');
        }
    });

    // Relay audio data from Host to all Clients in the room
    socket.on('audio-data', ({ roomCode, data }) => {
        // Broadcast to everyone in the room except the sender (the host)
        socket.to(roomCode).emit('audio-stream', data);
    });

    // Sync playback state (play/pause/seek)
    socket.on('sync-state', ({ roomCode, state }) => {
        if (rooms.has(roomCode) && rooms.get(roomCode).host === socket.id) {
            rooms.get(roomCode).state = state;
            socket.to(roomCode).emit('state-update', state);
        }
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
        for (const [roomCode, room] of rooms.entries()) {
            if (room.host === socket.id) {
                console.log(`Host disconnected, closing room ${roomCode}`);
                io.to(roomCode).emit('room-closed');
                rooms.delete(roomCode);
            } else if (room.participants.has(socket.id)) {
                room.participants.delete(socket.id);
                io.to(room.host).emit('participant-left', socket.id);
                updateRoomCount(roomCode);
            }
        }
    });
});

// SPA Routing: Serve index.html for any unknown routes if it exists
app.get('*', (req, res) => {
    const indexPath = path.join(__dirname, '../dist/index.html');
    if (require('fs').existsSync(indexPath)) {
        res.sendFile(indexPath);
    } else {
        res.status(404).send('Backend only: Frontend build not found.');
    }
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
