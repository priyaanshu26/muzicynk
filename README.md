# Muzicynk - Generic Audio Broadcast System

A modern, sleek web application that allows you to broadcast any audio from your laptop to any number of devices in real-time. Sync your sound across rooms, friends, or devices with zero configuration.

## 🚀 Features

- **Any Source**: Broadcast system audio, music players, or browser tabs.
- **Low Latency**: Real-time audio relay using Socket.io and Web Audio API.
- **Modern UI**: Sleek glassmorphism design with Framer Motion animations.
- **Room Management**: Join via simple 6-digit codes or direct links.
- **Cross-Platform**: Listen on any device (iOS, Android, Mac, PC).
 
## 💻 Host Compatibility
 
Broadcasting is supported on desktop operating systems due to system audio capture requirements:
- ✅ **Windows** (Chrome/Edge recommended)
- ✅ **macOS** (Chrome/Safari/Edge)
- ❌ **Mobile** (Browsers cannot yet capture system audio)
 
## 📱 Listener Compatibility
- ✅ **Any device** with a modern web browser (iOS, Android, Windows, Mac, Linux).

## 🛠️ Tech Stack

- **Frontend**: React + Vite + Framer Motion + Lucide Icons
- **Backend**: Node.js + Express + Socket.io
- **Audio**: Web Audio API (PCM Stream Processing)

## 🏃 Running Locally

### 1. Install Dependencies
```bash
npm install
cd server
npm install
```

### 2. Start the App (Development)
You need to run both the server and the frontend:
```bash
# Terminal 1: Frontend
npm run dev

# Terminal 2: Backend
cd server
npm run dev
```

Visit `http://localhost:5173` to start.

## 🌐 Deployment

The app is production-ready and can be hosted on platforms like **Render**, **Railway**, or **Heroku**.

1. **Build**: `npm run build`
2. **Start**: `npm start` (Runs the Node server which handles both API and Frontend static files)

## 📝 How to Broadcast
1. Open the app as a **Host**.
2. Click **Start Audio Broadcast**.
3. In the browser popup, select a tab/screen and ensure **"Share system audio"** is checked.
4. share your **Room Code** with others!

---
Built with ❤️ by **Priyanshu Chaudhary** in collaboration with **AI**.
