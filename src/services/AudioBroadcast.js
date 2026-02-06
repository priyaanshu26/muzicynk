import { io } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_SERVER_URL || (window.location.hostname === 'localhost' ? 'http://localhost:3001' : window.location.origin);

class BroadcastService {
    constructor() {
        this.socket = null;
        this.stream = null;
        this.audioContext = null;
        this.source = null;
        this.processor = null;
        this.roomCode = null;
        this.onStatusChange = null;
        this.onRoomCountChange = null;
    }

    async startBroadcast(roomCode) {
        this.roomCode = roomCode;
        this.socket = io(SOCKET_URL);

        try {
            // 1. Capture System Audio (Capture screen with audio)
            // Note: User must check "Share system audio" in the browser popup
            this.stream = await navigator.mediaDevices.getDisplayMedia({
                video: true, // required for audio capture in many browsers
                audio: {
                    echoCancellation: false,
                    noiseSuppression: false,
                    autoGainControl: false
                }
            });

            const audioTracks = this.stream.getAudioTracks();
            if (audioTracks.length === 0) {
                throw new Error("No audio track found. Did you check 'Share system audio'?");
            }

            this.audioContext = new (window.AudioContext || window.webkitAudioContext)({
                sampleRate: 44100
            });

            this.source = this.audioContext.createMediaStreamSource(new MediaStream([audioTracks[0]]));

            // 2. Process audio into chunks (using ScriptProcessor for compatibility)
            // 4096 is a good balance between latency and overhead
            this.processor = this.audioContext.createScriptProcessor(4096, 1, 1);

            this.processor.onaudioprocess = (e) => {
                const inputData = e.inputBuffer.getChannelData(0);
                // Send as Float32Array
                if (this.socket && this.socket.connected) {
                    this.socket.emit('audio-data', {
                        roomCode: this.roomCode,
                        data: inputData.buffer // Send as ArrayBuffer
                    });
                }
            };

            this.source.connect(this.processor);
            this.processor.connect(this.audioContext.destination);

            this.socket.emit('create-room', this.roomCode);

            this.socket.on('room-count-update', (count) => {
                if (this.onRoomCountChange) this.onRoomCountChange(count);
            });

            if (this.onStatusChange) this.onStatusChange('Live');
            return true;
        } catch (err) {
            console.error("Error starting broadcast:", err);
            this.stopBroadcast();
            throw err;
        }
    }

    stopBroadcast() {
        if (this.processor) {
            this.processor.disconnect();
            this.processor = null;
        }
        if (this.source) {
            this.source.disconnect();
            this.source = null;
        }
        if (this.audioContext) {
            this.audioContext.close();
            this.audioContext = null;
        }
        if (this.stream) {
            this.stream.getTracks().forEach(track => track.stop());
            this.stream = null;
        }
        if (this.socket) {
            this.socket.disconnect();
            this.socket = null;
        }
        if (this.onStatusChange) this.onStatusChange('Idle');
    }

    syncState(state) {
        if (this.socket && this.socket.connected) {
            this.socket.emit('sync-state', { roomCode: this.roomCode, state });
        }
    }
}

export const broadcastService = new BroadcastService();
