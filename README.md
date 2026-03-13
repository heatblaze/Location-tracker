# CYBER-TRACK // GLOBAL UPLINK

A professional hacker-themed live location tracker using Node.js, Socket.io, and Leaflet.js.

![Dashboard Preview](https://raw.githubusercontent.com/heatblaze/Location-tracker/main/preview.png)

## Features
- **Real-time Tracking**: Instant location updates for all connected nodes.
- **Hacker Dashboard**: Dark, cyberpunk aesthetic with neon pulsing markers.
- **Surveillance Map**: Stylized dark-mode OpenStreetMap integration.
- **Data Panel**: Real-time uplink status and node count tracking.

## Tech Stack
- **Backend**: Node.js, Express, Socket.io
- **Frontend**: HTML5, CSS3 (Vanilla), JavaScript, Leaflet.js

## Project Structure
```text
location-tracker/
├── backend/            # Express server & Socket.io logic
│   ├── server.js
│   └── package.json
├── frontend/           # Static frontend assets
│   └── public/
│       ├── index.html
│       ├── style.css
│       └── app.js
└── package.json        # Root package manifest
```

## Quick Start

### 1. Backend Setup
```bash
cd backend
npm install
npm start
```
The server will run on `http://localhost:5000`.

### 2. Frontend Setup
Serve the `frontend/public` directory using any static server (e.g., `npx serve` or Live Server).
```bash
npx serve -l 3000 frontend/public
```
Open `http://localhost:3000` in your browser.

## Legal Disclaimer
This project is for educational purposes only. Always respect privacy and obtain consent before tracking any location data.
