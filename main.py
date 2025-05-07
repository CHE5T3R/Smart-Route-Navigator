import xml.etree.ElementTree as ET
import json
import math

def haversine(coord1, coord2):
    R = 6371e3
    lat1, lon1 = math.radians(coord1[0]), math.radians(coord1[1])
    lat2, lon2 = math.radians(coord2[0]), math.radians(coord2[1])
    dlat = lat2 - lat1
    dlon = lon2 - lon1
    a = math.sin(dlat/2)**2 + math.cos(lat1)*math.cos(lat2)*math.sin(dlon/2)**2
    return R * 2 * math.atan2(math.sqrt(a), math.sqrt(1-a))

tree = ET.parse("map.osm")
root = tree.getroot()

raw_nodes = {}
edges = {}
used_node_ids = set()

for node in root.findall("node"):
    node_id = node.attrib["id"]
    lat = float(node.attrib["lat"])
    lon = float(node.attrib["lon"])
    raw_nodes[node_id] = [lat, lon]

for way in root.findall("way"):
    nds = [nd.attrib["ref"] for nd in way.findall("nd")]
    tags = {tag.attrib["k"]: tag.attrib["v"] for tag in way.findall("tag")}

    if "highway" in tags:
        for i in range(len(nds) - 1):
            a, b = nds[i], nds[i+1]

            if a in raw_nodes and b in raw_nodes:
                used_node_ids.add(a)
                used_node_ids.add(b)
                dist = haversine(raw_nodes[a], raw_nodes[b])
                edges.setdefault(a, []).append({ "node": b, "weight": dist })
                edges.setdefault(b, []).append({ "node": a, "weight": dist })

nodes = {nid: raw_nodes[nid] for nid in used_node_ids}

graph = {
    "nodes": nodes,
    "edges": edges
}

with open("roads.json", "w", encoding="utf-8") as f:
    json.dump(graph, f, indent=2)

print("başarılı")
