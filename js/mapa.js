var map = L.map('map').setView([-14.954406009810985, -56.34078703641914], 5);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 20,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// Verifica se o navegador suporta geolocalização
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
        function (position) {
            // Obtém a latitude e longitude do usuário
            var userLat = position.coords.latitude;
            var userLng = position.coords.longitude;

            // Centraliza o mapa na localização do usuário
            map.setView([userLat, userLng], 12); // Ajusta o zoom conforme necessário

            // Opcional: adiciona um marcador na localização do usuário
            //L.marker([userLat, userLng]).addTo(map)
            //    .bindPopup('Você está aqui!')
            //    .openPopup();
        },
        function () {
            map.setView([-14.954406009810985, -56.34078703641914], 5);
        }
    );
} else {
    map.setView([-14.954406009810985, -56.34078703641914], 5);
}

// Variável global para armazenar o marcador atual
var marcadorLocalAtual = null;
var marcadorSupermercados = [];
var marcadorPadarias = [];
var marcadorFarmacias = [];
var iconMarcadorLocalAtual = L.icon({
    iconUrl: 'https://cdn.jsdelivr.net/gh/pointhi/leaflet-color-markers@master/img/marker-icon-black.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [30, 49.2],
    iconAnchor: [15, 49],
    popupAnchor: [1.5, -34],
    shadowSize: [41, 41]
});

//Variáveis para armazenar os marcadores dos objetos de interesse
var iconMarcadorSupermercado = L.icon({
    iconUrl: 'https://cdn.jsdelivr.net/gh/pointhi/leaflet-color-markers@master/img/marker-icon-blue.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [30, 49.2],
    iconAnchor: [15, 49],
    popupAnchor: [1.5, -34],
    shadowSize: [41, 41]
});

var iconMarcadorPadaria = L.icon({
    iconUrl: 'https://cdn.jsdelivr.net/gh/pointhi/leaflet-color-markers@master/img/marker-icon-yellow.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [30, 49.2],
    iconAnchor: [15, 49],
    popupAnchor: [1.5, -34],
    shadowSize: [41, 41]
});

var iconMarcadorFarmacia = L.icon({
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