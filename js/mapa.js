var map = L.map('map').setView([-15.836104636023594, -48.039736747741706], 12);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 20,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// Variável global para armazenar o marcador atual
var marcadorLocalAtual = null;
var iconMarcadorLocalAtual = L.icon({
    iconUrl: 'https://cdn.jsdelivr.net/gh/pointhi/leaflet-color-markers@master/img/marker-icon-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [30, 49.2],
    iconAnchor: [15, 49],
    popupAnchor: [1.5, -34],
    shadowSize: [41, 41]
});

//Variável global para armazenar as coordenadas do marcador
var latMarcador = null;
var lonMarcador = null;