let map = L.map('map').setView([47.555, 12.925], 13);

// Satellitenkarte
L.tileLayer(
  'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
  { maxZoom: 18 }
).addTo(map);

// Marker
const watzmannhaus = [47.561, 12.921];
const wimbach = [47.567, 12.890];
const start = [47.558, 12.906];

L.marker(start).addTo(map).bindPopup("Start Wimbachbrücke");
L.marker(watzmannhaus).addTo(map).bindPopup("Watzmannhaus");
L.marker(wimbach).addTo(map).bindPopup("Wimbachgrieshütte");

// Live Standort
function showLocation() {
  navigator.geolocation.getCurrentPosition(pos => {
    let user = [pos.coords.latitude, pos.coords.longitude];
    L.marker(user).addTo(map).bindPopup("Du bist hier");
    map.setView(user, 14);
  });
}

// Tagesinfos
function showDay(day) {
  let info = document.getElementById("info");

  if (day === 1) {
    info.innerHTML = `
    <h2>Tag 1: Wimbachbrücke → Watzmannhaus</h2>
    ⏱️ Dauer: 4–5h<br>
    ⛰️ Höhenmeter: +1300m<br><br>

    🍽️ Hütten:
    <button>Grünsteinhütte</button>
    <button>Kührointalm</button>

    <p>Steiler Aufstieg, tolle Aussicht auf Königssee.</p>
    `;
  }

  if (day === 2) {
    info.innerHTML = `
    <h2>Tag 2: Watzmannhaus → Wimbachgrieshütte</h2>
    ⏱️ Dauer: 6–7h<br>
    ⛰️ Höhenmeter: +400m / -1200m<br><br>

    🍽️ Hütten:
    <button>Trischübel</button>

    <p>Alpine Querung mit spektakulären Ausblicken.</p>
    `;
  }

  if (day === 3) {
    info.innerHTML = `
    <h2>Tag 3: Abstieg</h2>
    ⏱️ Dauer: 2–3h<br>
    ⛰️ Höhenmeter: -400m<br>

    <p>Entspannter Rückweg durchs Wimbachtal.</p>
    `;
  }
}
