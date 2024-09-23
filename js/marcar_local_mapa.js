// Variável global para controlar se a marcação no mapa está habilitada
var marcarNoMapaHabilitado = false;
//var marcadorAtual = null; // Para armazenar o marcador no mapa

// Função para habilitar o modo de marcação no mapa
document.getElementById('searchMapBtn').addEventListener('click', function() {
    marcarNoMapaHabilitado = true;
    alert('Clique no mapa para marcar a localização desejada.');
});

// Lida com o clique no mapa para adicionar o marcador
map.on('click', function(click) {
    if (marcarNoMapaHabilitado) {
        var lat = click.latlng.lat;
        var lon = click.latlng.lng;

        // Se houver um marcador existente, removê-lo
        if (marcadorLocalAtual) {
            map.removeLayer(marcadorLocalAtual);
        }

        // Adicionar novo marcador no local do clique
        marcadorLocalAtual = L.marker([lat, lon]).addTo(map)
            .bindPopup('Localização marcada!')
            .openPopup();

        // Centralizar o mapa na localização clicada
        map.setView([lat, lon], 12);

        // Desativar o modo de marcação após adicionar o marcador
        marcarNoMapaHabilitado = false;
    }
});
