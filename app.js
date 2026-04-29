let map = L.map('map').setView([47.55, 12.92], 13);

// Satellit
L.tileLayer(
  'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
  { maxZoom: 18 }
).addTo(map);

// Start / Hütten
const start = [47.558, 12.906];
const watzmannhaus = [47.561, 12.921];
const wimbach = [47.567, 12.890];

L.marker(start).addTo(map).bindPopup("Wimbachbrücke");
L.marker(watzmannhaus).addTo(map).bindPopup("Watzmannhaus");
L.marker(wimbach).addTo(map).bindPopup("Wimbachgrieshütte");

// ROUTEN
let routeLayer;

const routes = {
  1: [
    [47.558, 12.906],
    [47.565, 12.910],
    [47.561, 12.921]
  ],
  2: [
    [47.561, 12.921],
    [47.570, 12.905],
    [47.567, 12.890]
  ],
  3: [
    [47.567, 12.890],
    [47.558, 12.906]
  ]
};

function showDay(day) {
  if (routeLayer) map.removeLayer(routeLayer);

  routeLayer = L.polyline(routes[day], {
    color: 'yellow',
    weight: 4
  }).addTo(map);

  map.fitBounds(routeLayer.getBounds());

  const info = document.getElementById("info");

  if (day === 1) {
    info.innerHTML = "<h2>Tag 1</h2>Wimbachbrücke → Watzmannhaus<br>⛰️ +1300m";
  }
  if (day === 2) {
    info.innerHTML = "<h2>Tag 2</h2>Watzmannhaus → Wimbachgrieshütte";
  }
  if (day === 3) {
    info.innerHTML = "<h2>Tag 3</h2>Abstieg ins Tal";
  }
}

// Standort
function showLocation() {
  navigator.geolocation.getCurrentPosition(pos => {
    const user = [pos.coords.latitude, pos.coords.longitude];
    L.marker(user).addTo(map).bindPopup("Du bist hier");
    map.setView(user, 14);
  });
}

// HÜTTEN
function showHut(name) {
  const info = document.getElementById("info");

  const huts = {
    watzmann: `
      <h2>Watzmannhaus</h2>
      🕒 Mai–Oktober<br>
      🍽️ Kaiserschmarrn, Suppe, Brotzeit
    `,
    wimbach: `
      <h2>Wimbachgrieshütte</h2>
      🕒 Saisonbetrieb<br>
      🍽️ Knödel, Suppe, Kuchen
    `
  };

  info.innerHTML = huts[name];
}

// PACKLISTE
const items = [
  "Wanderstöcke",
  "Socken",
  "Regenjacke",
  "Wasser",
  "Snacks",
  "Erste Hilfe",
  "Flipflops"
];

function loadList() {
  const o = document.getElementById("list-oliver");
  const m = document.getElementById("list-martin");

  items.forEach(i => {
    o.innerHTML += `<li><input type='checkbox'> ${i}</li>`;
    m.innerHTML += `<li><input type='checkbox'> ${i}</li>`;
  });
}

function addItem() {
  const val = document.getElementById("newItem").value;
  if (!val) return;

  document.getElementById("list-oliver").innerHTML += `<li><input type='checkbox'> ${val}</li>`;
  document.getElementById("list-martin").innerHTML += `<li><input type='checkbox'> ${val}</li>`;
}

window.onload = loadList;
