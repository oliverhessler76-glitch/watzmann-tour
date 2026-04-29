let map = L.map('map').setView([47.9, 12.9], 10);

// Satellit
L.tileLayer(
  'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
  { maxZoom: 18 }
).addTo(map);

// Punkte
const start = [47.558, 12.906];
const watzmannhaus = [47.561, 12.921];
const wimbach = [47.567, 12.890];

// Marker
L.marker(start).addTo(map).bindPopup("Wimbachbrücke");
L.marker(watzmannhaus).addTo(map).bindPopup("Watzmannhaus");
L.marker(wimbach).addTo(map).bindPopup("Wimbachgrieshütte");

// Route Layer
let routeLayer;

// 🧭 HOME
function resetView() {
  if (routeLayer) map.removeLayer(routeLayer);
  map.setView([48.2, 11.6], 8);
  document.getElementById("info").innerHTML =
    "<h2>🏠 Zuhause</h2>Startpunkt außerhalb der Tour";
}

// 🏔️ ROUTEN
function showDay(day) {

  if (routeLayer) map.removeLayer(routeLayer);

  if (day === 1) {
    routeLayer = L.polyline(
      [start, watzmannhaus],
      { color: "blue", weight: 5 }
    ).addTo(map);

    map.setView(start, 13);

    document.getElementById("info").innerHTML = `
      <h2>Tag 1</h2>
      Wimbachbrücke → Watzmannhaus<br>
      ⛰️ +1300m<br><br>
      <button onclick="showHut('watzmann')">Watzmannhaus</button>
    `;
  }

  if (day === 2) {
    routeLayer = L.polyline(
      [watzmannhaus, wimbach],
      { color: "orange", weight: 5 }
    ).addTo(map);

    map.setView(watzmannhaus, 13);

    document.getElementById("info").innerHTML = `
      <h2>Tag 2</h2>
      Watzmannhaus → Wimbachgrieshütte<br><br>
      <button onclick="showHut('wimbach')">Wimbachgrieshütte</button>
    `;
  }

  if (day === 3) {
    routeLayer = L.polyline(
      [wimbach, start],
      { color: "green", weight: 5 }
    ).addTo(map);

    map.setView(wimbach, 13);

    document.getElementById("info").innerHTML =
      "<h2>Tag 3</h2>Abstieg ins Tal";
  }
}

// 🍽️ HÜTTEN
function showHut(name) {
  const info = document.getElementById("info");

  const huts = {
    watzmann: `
      <h2>Watzmannhaus (1930m)</h2>
      🕒 Mai–Oktober<br>
      🍽️ Kaiserschmarrn, Suppen, Brotzeit, Bier 🍺
    `,
    wimbach: `
      <h2>Wimbachgrieshütte (1327m)</h2>
      🕒 Saisonbetrieb<br>
      🍽️ Knödel, Suppe, Kuchen, Getränke
    `
  };

  info.innerHTML = huts[name];
}

// 🎒 PACKLISTE PRO
const baseItems = [
  "Trekkingstöcke",
  "Hüttenschlafsack",
  "Euro-Packs / Bargeld",
  "Regenjacke",
  "Regenhose",
  "Wanderschuhe",
  "Socken",
  "Funktionsshirt",
  "Unterwäsche",
  "Mütze",
  "Handschuhe",
  "Stirnlampe",
  "Powerbank",
  "Erste Hilfe Set",
  "Snacks / Riegel",
  "Wasser (2–3L)",
  "Sonnencreme",
  "Offline Karten",
  "Notfallausrüstung"
];

function render() {
  ["oliver", "martin"].forEach(user => {
    const el = document.getElementById(user);
    el.innerHTML = "";

    baseItems.forEach((item, i) => {
      const key = user + i;
      const checked = localStorage.getItem(key) === "1";

      el.innerHTML += `
        <div class="item">
          <span>${item}</span>
          <input type="checkbox"
            ${checked ? "checked" : ""}
            onchange="toggle('${key}')">
        </div>
      `;
    });
  });
}

function toggle(key) {
  const val = localStorage.getItem(key) === "1" ? "0" : "1";
  localStorage.setItem(key, val);
}

function addItem() {
  const val = document.getElementById("newItem").value;
  if (!val) return;

  baseItems.push(val);
  render();
}

render();
