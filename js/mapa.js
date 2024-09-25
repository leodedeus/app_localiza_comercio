var map = L.map('map').setView([-18.916411, -48.273891], 12);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 20,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// Variável global para armazenar o marcador atual
var marcadorLocalAtual = null;

//Variável global para armazenar as coordenadas do marcador
var latMarcador = null;
var lonMarcador = null;