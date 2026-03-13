const socket = io('http://localhost:5000');
const nodeCountEl = document.getElementById('node-count');

// Dark map settings
let map = L.map('map', {
    zoomControl: false,
    attributionControl: false
}).setView([20, 77], 5);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(map);

// Add custom zoom control to the right
L.control.zoom({
    position: 'bottomright'
}).addTo(map);

let myMarker, markers = {};

// Custom Icon Function
const createCustomIcon = (color, labelText) => {
    return L.divIcon({
        className: 'custom-marker',
        html: `
            <div class="marker-pulse" style="background: ${color}; border-color: ${color}; box-shadow: 0 0 10px ${color};"></div>
            <div class="marker-label" style="border-color: ${color}; color: ${color};">${labelText}</div>
        `,
        iconSize: [20, 20],
        iconAnchor: [10, 10]
    });
};

if ('geolocation' in navigator) {
    navigator.geolocation.watchPosition(
        (position) => {
            const { latitude, longitude } = position.coords;
            if (!myMarker) {
                myMarker = L.marker([latitude, longitude], {
                    icon: createCustomIcon('#00ff41', 'LOCAL_NODE')
                }).addTo(map);
                map.setView([latitude, longitude], 15);
            } else {
                myMarker.setLatLng([latitude, longitude]);
            }
            socket.emit('locationUpdate', { latitude, longitude });
        },
        (err) => { 
            console.error('GPS ACCESS DENIED'); 
        },
        { enableHighAccuracy: true }
    );
}

socket.on('userLocations', (users) => {
    const ids = Object.keys(users);
    nodeCountEl.textContent = ids.length;

    // Remove disconnected users
    Object.keys(markers).forEach(id => {
        if (!users[id]) {
            map.removeLayer(markers[id]);
            delete markers[id];
        }
    });

    // Update/Add markers for others
    Object.entries(users).forEach(([id, loc]) => {
        if (id === socket.id) return; // Skip self as handled separately

        if (!markers[id]) {
            markers[id] = L.marker([loc.latitude, loc.longitude], {
                icon: createCustomIcon('#ff003c', `REMOTE_NODE_${id.substring(0,4)}`)
            }).addTo(map);
        } else {
            markers[id].setLatLng([loc.latitude, loc.longitude]);
        }
    });
});
