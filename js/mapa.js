var map = L.map('map').setView([-14.954406009810985, -56.34078703641914], 5);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 20,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

//Variável global para armazenar as coordenadas do marcador
var latMarcador = null;
var lonMarcador = null;

// Variável global para armazenar o marcador atual
var marcadorLocalAtual = null;
var marcadorSupermercados = [];
var marcadorPadarias = [];
var marcadorFarmacias = [];
var marcadorPostos = [];
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
    iconSize: [30 * 0.8, 49.2 * 0.8],
    iconAnchor: [15 * 0.8, 49 * 0.8],
    popupAnchor: [1.5 * 0.8, -34 * 0.8],
    shadowSize: [41 * 0.8, 41 * 0.8]
});

var iconMarcadorPadaria = L.icon({
    iconUrl: 'https://cdn.jsdelivr.net/gh/pointhi/leaflet-color-markers@master/img/marker-icon-yellow.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [30 * 0.8, 49.2 * 0.8],
    iconAnchor: [15 * 0.8, 49 * 0.8],
    popupAnchor: [1.5 * 0.8, -34 * 0.8],
    shadowSize: [41 * 0.8, 41 * 0.8]
});

var iconMarcadorFarmacia = L.icon({
    iconUrl: 'https://cdn.jsdelivr.net/gh/pointhi/leaflet-color-markers@master/img/marker-icon-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [30 * 0.8, 49.2 * 0.8],
    iconAnchor: [15 * 0.8, 49 * 0.8],
    popupAnchor: [1.5 * 0.8, -34 * 0.8],
    shadowSize: [41 * 0.8, 41 * 0.8]
});

var iconMarcadorPosto = L.icon({
    iconUrl: 'https://cdn.jsdelivr.net/gh/pointhi/leaflet-color-markers@master/img/marker-icon-violet.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [30 * 0.8, 49.2 * 0.8],
    iconAnchor: [15 * 0.8, 49 * 0.8],
    popupAnchor: [1.5 * 0.8, -34 * 0.8],
    shadowSize: [41 * 0.8, 41 * 0.8]
});

// Verifica se o navegador suporta geolocalização
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
        function (position) {
            // Obtém a latitude e longitude do usuário
            latMarcador = position.coords.latitude;
            lonMarcador = position.coords.longitude;
            console.log(`Coordenadas do usuário: ${latMarcador}, ${lonMarcador}`)

            // Centraliza o mapa na localização do usuário
            map.setView([latMarcador, lonMarcador], 15); // Ajusta o zoom conforme necessário

            // Opcional: adiciona um marcador na localização do usuário
            //L.marker([userLat, userLng]).addTo(map)
            marcadorLocalAtual = L.marker([latMarcador, lonMarcador], { icon: iconMarcadorLocalAtual, draggable: true }).addTo(map)
                .bindPopup('Você está aqui!')
                .openPopup();
        },
        function () {
            map.setView([-14.954406009810985, -56.34078703641914], 5);
        }
    );
} else {
    map.setView([-14.954406009810985, -56.34078703641914], 5);
}



