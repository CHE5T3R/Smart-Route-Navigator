export async function dijkstraAnimated(graph, start, end, visitCallback, delay = 100, stopCallback = () => false) {
  const distances = {};
  const previous = {};
  const visited = new Set();
  const pq = new Set(Object.keys(graph));

  for (let node of pq) {
    distances[node] = Infinity;
    previous[node] = null;
  }

  distances[start] = 0;

  while (pq.size > 0) {
    let current = [...pq].reduce((a, b) =>
      distances[a] < distances[b] ? a : b
    );

    if (current === end || stopCallback()) break;

    pq.delete(current);
    visited.add(current);

    if (visitCallback) visitCallback(current);
    await new Promise(res => setTimeout(res, delay));

    for (let neighbor of graph[current]) {
      if (visited.has(neighbor.node)) continue;
      const alt = distances[current] + neighbor.weight;
      if (alt < distances[neighbor.node]) {
        distances[neighbor.node] = alt;
        previous[neighbor.node] = current;
      }
    }
  }

  const path = [];
  let u = end;
  while (u) {
    path.unshift(u);
    u = previous[u];
  }

  return path.length > 1 ? path : null;
}

export function dijkstraInstant(graph, start, end) {
  const distances = {};
  const previous = {};
  const visited = new Set();
  const pq = new Set(Object.keys(graph));

  for (let node of pq) {
    distances[node] = Infinity;
    previous[node] = null;
  }

  distances[start] = 0;

  while (pq.size > 0) {
    let current = [...pq].reduce((a, b) =>
      distances[a] < distances[b] ? a : b
    );

    if (current === end) break;

    pq.delete(current);
    visited.add(current);

    for (let neighbor of graph[current]) {
      if (visited.has(neighbor.node)) continue;
      const alt = distances[current] + neighbor.weight;
      if (alt < distances[neighbor.node]) {
        distances[neighbor.node] = alt;
        previous[neighbor.node] = current;
      }
    }
  }

  const path = [];
  let u = end;
  while (u) {
    path.unshift(u);
    u = previous[u];
  }

  return path.length > 1 ? path : null;
}
