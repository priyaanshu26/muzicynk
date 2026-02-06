# 🎧 Muzicynk — Real-Time Audio Broadcasting

Muzicynk is a real-time audio broadcasting web app that lets you stream audio from one device to multiple listeners instantly using a browser.
No Spotify login. No file uploads. Just create a room and broadcast.

Think of it as “screen sharing, but for audio.”

---

## 🚀 What Muzicynk Does

- 🔊 Broadcast audio from your browser or system (desktop)
- 👥 Multiple listeners can join using a room code
- ⚡ Real-time streaming with low latency
- 🌐 Works directly in the browser
- 🎨 Smooth UI with animations

---

## 🧠 How It Works

1. Broadcaster creates a room
2. Browser captures audio using the Web Audio API
3. Audio chunks are sent via Socket.io
4. Listeners receive and play audio in real time

⚠️ Due to browser security restrictions, full system audio capture works best on desktop browsers (Chrome recommended).

---

## 🛠️ Tech Stack

### Frontend
- React (Vite)
- Web Audio API
- Framer Motion
- Socket.io Client

### Backend
- Node.js
- Express
- Socket.io

---

## ✨ Features

- 🎙️ Live audio broadcasting
- 🧩 Room-based audio sharing
- ⚡ Real-time communication
- 💻 Desktop-focused experience
- 🎨 Modern UI with animations

---

## 🧪 Browser Compatibility

Browser Support:
- Chrome (Desktop): ✅ Recommended
- Edge (Desktop): ✅
- Firefox: ⚠️ Limited
- Mobile Browsers: ❌ Not Supported

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

$ git clone https://github.com/priyaanshu26/muzicynk.git  
$ cd muzicynk

---

### 2️⃣ Install dependencies

Frontend:
$ cd client  
$ npm install  
$ npm run dev  

Backend:
$ cd server  
$ npm install  
$ node index.js  

---

### 3️⃣ Environment Variables (Optional)

Create a .env file inside the server folder:

PORT=5000

---

## 🌍 Deployment

You can deploy:
- Frontend → Vercel / Netlify
- Backend → Render / Railway / Heroku

Make sure:
- WebSocket connections are enabled
- Frontend points to the correct backend URL

---

## 🚧 Known Limitations

- Browser restrictions limit system audio capture
- Mobile browsers do not support required APIs
- Audio quality depends on network stability

---

## 🔮 Future Improvements

- 🎚️ Audio quality controls
- 💬 In-room chat
- 🔐 Authentication for rooms
- 🎧 Multiple broadcasters
- 📱 Progressive Web App (PWA) support

---

## 👨‍💻 Author

Priyanshu  
Computer Science Engineering Student  
Interested in full-stack development and real-time systems

---

## ⭐ Support

If you find this project interesting:
- Star the repository ⭐
- Open issues for bugs or feature requests
- Contributions are welcome 🤝