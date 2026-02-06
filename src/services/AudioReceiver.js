import { io } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_SERVER_URL || (window.location.hostname === 'localhost' ? 'http://localhost:3001' : window.location.origin);

class ReceiverService {
    constructor() {
        this.socket = null;
        this.audioContext = null;
        this.roomCode = null;
        this.onStatusChange = null;
        this.onStateUpdate = null;
        this.onRoomCountChange = null;
        this.isPlaying = false;
        this.startTime = 0;
    }

    joinRoom(roomCode) {
        this.roomCode = roomCode;
        this.socket = io(SOCKET_URL);

        this.socket.on('connect', () => {
            this.socket.emit('join-room', this.roomCode);
        });

        this.socket.on('room-joined', () => {
            if (this.onStatusChange) this.onStatusChange('Live');
            this.initAudio();
        });

        this.socket.on('audio-stream', (arrayBuffer) => {
            this.handleAudioData(arrayBuffer);
        });

        this.socket.on('state-update', (state) => {
            if (this.onStateUpdate) this.onStateUpdate(state);
        });

        this.socket.on('room-count-update', (count) => {
            if (this.onRoomCountChange) this.onRoomCountChange(count);
        });

        this.socket.on('room-closed', () => {
            alert('Broadcast has ended');
            this.leaveRoom();
        });

        this.socket.on('error', (msg) => {
            alert(msg);
            this.leaveRoom();
        });
    }

    initAudio() {
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)({
            sampleRate: 44100
        });
        this.startTime = this.audioContext.currentTime;
        this.isPlaying = true;
    }

    handleAudioData(arrayBuffer) {
        if (!this.audioContext || !this.isPlaying) return;

        // Convert ArrayBuffer back to Float32Array
        const floatData = new Float32Array(arrayBuffer);

        // Create an audio buffer
        const buffer = this.audioContext.createBuffer(1, floatData.length, 44100);
        buffer.getChannelData(0).set(floatData);

        // Create source and play at a specific time (scheduling to prevent gaps)
        const source = this.audioContext.createBufferSource();
        source.buffer = buffer;
        source.connect(this.audioContext.destination);

        // Schedule slightly in the future to handle jitter
        const scheduleTime = Math.max(this.startTime, this.audioContext.currentTime + 0.05);
        source.start(scheduleTime);

        // Update the next start time
        this.startTime = scheduleTime + buffer.duration;
    }

    leaveRoom() {
        if (this.audioContext) {
            this.audioContext.close();
            this.audioContext = null;
        }
        if (this.socket) {
            this.socket.disconnect();
            this.socket = null;
        }
        this.isPlaying = false;
        if (this.onStatusChange) this.onStatusChange('Idle');
    }
}

export const receiverService = new ReceiverService();
