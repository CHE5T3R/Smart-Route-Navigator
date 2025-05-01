function dijkstra(graph, start, end) {
  const distances = {};
  const previous = {};
  const unvisited = new Set(graph.nodes);

  graph.nodes.forEach(node => {
    distances[node] = Infinity;
    previous[node] = null;
  });
  distances[start] = 0;

  while (unvisited.size > 0) {
    let current = null;
    let minDistance = Infinity;

    unvisited.forEach(node => {
      if (distances[node] < minDistance) {
        minDistance = distances[node];
        current = node;
      }
    });

    if (current === end || distances[current] === Infinity) break;

    unvisited.delete(current);

    const neighbors = graph.edges[current] || [];
    neighbors.forEach(neighbor => {
      const alt = distances[current] + neighbor.weight;
      if (alt < distances[neighbor.node]) {
        distances[neighbor.node] = alt;
        previous[neighbor.node] = current;
      }
    });
  }

  const path = [];
  let node = end;
  while (node) {
    path.unshift(node);
    node = previous[node];
  }

  if (path[0] !== start) return { path: [], distance: Infinity };
  return { path, distance: distances[end] };
}
