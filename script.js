import { dijkstraAnimated, dijkstraInstant } from './dijkstra.js';

const map = L.map('map').setView([37.19, 28.36], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

let nodes = {}, edges = {}, selectedPoints = [];
let markers = [], visitedMarkers = [], currentPolyline = null;

const stepModeCheckbox = document.getElementById("stepMode");
const speedInput = document.getElementById("speedRange");
const speedLabel = document.getElementById("speedValue");
const statusText = document.getElementById("status");

speedInput.addEventListener("input", () => {
  speedLabel.textContent = `${getSpeed()} ms`;
});

function getSpeed() {
  const val = Number(speedInput.value);
  return 1010 - val;
}

fetch("roads.json")
  .then(res => res.json())
  .then(data => {
    nodes = data.nodes;
    edges = data.edges;
    statusText.textContent = "Haritadan iki nokta seçin.";
  });

map.on('click', async function (e) {
  if (selectedPoints.length === 2) {
    selectedPoints = [];
    markers.forEach(m => map.removeLayer(m));
    visitedMarkers.forEach(m => map.removeLayer(m));
    if (currentPolyline) map.removeLayer(currentPolyline);
    markers = [];
    visitedMarkers = [];
    currentPolyline = null;
    statusText.textContent = "Haritadan iki nokta seçin.";
  }

  const marker = L.marker(e.latlng).addTo(map);
  markers.push(marker);
  selectedPoints.push(e.latlng);

  if (selectedPoints.length === 2) {
    const startId = findNearestNode(selectedPoints[0]);
    const endId = findNearestNode(selectedPoints[1]);
    let path;
    let stop = false;

    if (stepModeCheckbox.checked) {
      const delay = getSpeed();
      path = await dijkstraAnimated(edges, startId, endId, showVisit, delay, () => stop);
    } else {
      path = dijkstraInstant(edges, startId, endId);
    }

    stop = true;

    if (!path) {
      alert("Yol bulunamadı.");
      return;
    }

    const latlngs = path.map(id => nodes[id]);
    currentPolyline = L.polyline(latlngs, { color: 'blue', weight: 4 }).addTo(map);

    let totalDistance = 0;
    for (let i = 0; i < latlngs.length - 1; i++) {
      totalDistance += getDistance(latlngs[i], latlngs[i + 1]);
    }
    statusText.textContent = `Rota bulundu. Toplam mesafe: ${(totalDistance / 1000).toFixed(2)} km`;
  }
});

function findNearestNode(latlng) {
  let minDist = Infinity;
  let nearestId = null;
  const point = [latlng.lat, latlng.lng];

  for (let id in nodes) {
    const dist = getDistance(point, nodes[id]);
    if (dist < minDist) {
      minDist = dist;
      nearestId = id;
    }
  }

  return nearestId;
}

function getDistance(a, b) {
  const R = 6371e3;
  const φ1 = a[0] * Math.PI / 180;
  const φ2 = b[0] * Math.PI / 180;
  const Δφ = (b[0] - a[0]) * Math.PI / 180;
  const Δλ = (b[1] - a[1]) * Math.PI / 180;

  const h = Math.sin(Δφ / 2) ** 2 +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ / 2) ** 2;

  return R * 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
}

function showVisit(nodeId) {
  const [lat, lon] = nodes[nodeId];
  const marker = L.circleMarker([lat, lon], {
    radius: 4,
    color: 'orange',
    fillColor: 'orange',
    fillOpacity: 0.6
  }).addTo(map);
  visitedMarkers.push(marker);
}
