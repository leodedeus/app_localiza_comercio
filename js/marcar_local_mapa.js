// Variável global para controlar se a marcação no mapa está habilitada
var marcarNoMapaHabilitado = false;
//var marcadorAtual = null; // Para armazenar o marcador no mapa

// Função para habilitar o modo de marcação no mapa
document.getElementById('searchMapBtn').addEventListener('click', function() {
    marcarNoMapaHabilitado = true;
    // Muda o cursor do mapa para uma cruz (crosshair)
    map.getContainer().style.cursor = 'crosshair';
    alert('Clique no mapa para marcar a localização desejada.');
});

// Lida com o clique no mapa para adicionar o marcador
map.on('click', function(click) {
    if (marcarNoMapaHabilitado) {
        latMarcador = click.latlng.lat;
        lonMarcador = click.latlng.lng;
        console.log(`Coordenadas marcadas: ${latMarcador}, ${lonMarcador}`);

        // Se houver um marcador existente, removê-lo
        if (marcadorLocalAtual) {
            map.removeLayer(marcadorLocalAtual);
        }

        // Adicionar novo marcador no local do clique
        marcadorLocalAtual = L.marker([latMarcador, lonMarcador], { draggable: true }).addTo(map)
            .bindPopup('Localização marcada!')
            .openPopup();

        // Centralizar o mapa na localização clicada
        map.setView([latMarcador, lonMarcador], 16);

        // Lidar com o evento de arrastar o marcador
        marcadorLocalAtual.on('dragend', function(event) {
            var newLatLng = event.target.getLatLng();
            latMarcador = newLatLng.lat;
            lonMarcador = newLatLng.lng;
            map.setView([latMarcador, lonMarcador], 15);
            console.log(`Marcador movido para: ${latMarcador}, ${lonMarcador}`);
        });

        // Desativar o modo de marcação após adicionar o marcador
        marcarNoMapaHabilitado = false;
        map.getContainer().style.cursor = '';  // Cursor padrão
    }
});
