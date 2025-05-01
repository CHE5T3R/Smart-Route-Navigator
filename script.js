let map = L.map('map').setView([51.505, -0.09], 13);
let startNode = null;
let endNode = null;
let polyline = null;
let graphData = null;

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

async function loadGraph() {
  const response = await fetch('graph-data.json');
  graphData = await response.json();

  for (const node in graphData.coordinates) {
    const coord = graphData.coordinates[node];
    const marker = L.circleMarker(coord, { radius: 6, color: 'blue' }).addTo(map);
    marker.bindTooltip(node);
    marker.on('click', () => onNodeClick(node));
  }

  updateInfo("2 nokta seç");
}

function onNodeClick(nodeId) {
  if (!startNode) {
    startNode = nodeId;
  } else if (!endNode && nodeId !== startNode) {
    endNode = nodeId;
    const result = dijkstra(graphData, startNode, endNode);

    if (result.path.length > 0) {
      drawPath(result.path);
      updateInfo(`En kısa yol: ${result.path.join(" → ")} (Mesafe: ${result.distance})`);
    } else {
      updateInfo("Yol yok.");
    }
  } else {
    resetSelection();
    onNodeClick(nodeId);
  }
}

function drawPath(path) {
  if (polyline) map.removeLayer(polyline);

  const coords = path.map(n => graphData.coordinates[n]);
  polyline = L.polyline(coords, { color: 'red' }).addTo(map);
  map.fitBounds(polyline.getBounds());
}

function resetSelection() {
  startNode = null;
  endNode = null;
  if (polyline) {
    map.removeLayer(polyline);
    polyline = null;
  }
  updateInfo("2 nokta seç");
}

function updateInfo(text) {
  const infoDiv = document.getElementById("info");
  if (infoDiv) infoDiv.innerText = text;
}

loadGraph();
