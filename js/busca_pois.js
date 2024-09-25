function buscarSupermercados(latitude, longitude) {
    var url = `https://overpass-api.de/api/interpreter?data=[out:json];node["shop"="supermarket"](around:3000,${latitude},${longitude});out;`;
    console.log(`Url buscada: ${url}`)

    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Processar os resultados e adicionar os supermercados ao mapa
            data.elements.forEach(function(element) {
                var marker = L.marker([element.lat, element.lon]).addTo(map)
                    .bindPopup('Supermercado encontrado! Nome: ' + (element.tags.name || 'Desconhecido'));
            });
        })
        .catch(error => {
            console.error('Erro ao buscar supermercados:', error);
        });
}

// Lida com o clique no botão
document.getElementById('searchPoiBtn').addEventListener('click', function() {
    if (marcadorLocalAtual) {
        buscarSupermercados(latMarcador, lonMarcador);
    } else {
        alert('Por favor, adicione um marcador no mapa primeiro.');
    }
});
