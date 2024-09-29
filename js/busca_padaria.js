function buscarPadaria(lat, lon) {
    const url = `https://overpass-api.de/api/interpreter?data=[out:json];(
        node["shop"="bakery"](around:3000,${lat},${lon});
        way["shop"="bakery"](around:3000,${lat},${lon});
        relation["shop"="bakery"](around:3000,${lat},${lon});
    );out body;`;
    console.log(`Url buscada: ${url}`)

    const bounds = L.latLngBounds();

    fetch(url)
        .then(response => response.json())
        .then(data => {
            data.elements.forEach(function(padaria) {
                if (padaria.type === "node") {
                    // Se for um nó, temos latitude e longitude
                    if (padaria.lat && padaria.lon) {
                        marcadorPadariasA = L.marker([padaria.lat, padaria.lon], { icon: iconMarcadorPadaria }).addTo(map)
                            .bindPopup('Padaria: ' + (padaria.tags.name || 'Desconhecido'));
                        bounds.extend([padaria.lat, padaria.lon]);
                    }
                } else if (padaria.type === "way") {
                    // Para "ways", verificamos se existe "center"
                    if (padaria.nodes) {
                        console.log(padaria.tags.name, padaria.nodes)
                        const firstNodeId = padaria.nodes[0]
                        console.log(`Primeiro nó: ${firstNodeId}`)
                        const urlNode = `https://overpass-api.de/api/interpreter?data=[out:json];node(${firstNodeId});out;`;
                        console.log(`Url do no: ${urlNode}`)
                        fetch(urlNode)
                            .then(response => response.json())
                            .then(data => {
                                data.elements.forEach(function(node) {
                                    if (node.lat && node.lon) {
                                        marcadorPadariasB = L.marker([node.lat, node.lon], { icon: iconMarcadorPadaria }).addTo(map)
                                        .bindPopup('Padaria: : ' + (padaria.tags.name || 'Desconhecido'));
                                    bounds.extend([node.lat, node.lon]);
                                    }
                                });
                            });
                    } else {
                        console.log('Way encontrado, mas sem centro definido.');
                    }
                } else if (padaria.type === "relation") {
                    // Similar para relações, verificar centro
                    if (padaria.center) {
                        marcadorPadariasC = L.marker([padaria.center.lat, padaria.center.lon], { icon: iconMarcadorPadaria }).addTo(map)
                            .bindPopup('Supermercado (Relação): ' + (padaria.tags.name || 'Desconhecido'));
                    } else {
                        console.log('Relação encontrada, mas sem centro definido.');
                    }
                }
            });
            // Ajusta o zoom do mapa para mostrar todos os marcadores
            if (bounds.isValid()) {  // Verifica se os limites são válidos
                map.fitBounds(bounds, { padding: [50, 50] });
            }
        })
        .catch(error => {
            console.error('Erro ao buscar supermercados:', error);
        });
}

// Lida com o clique no botão
document.getElementById('searchPadariaBtn').addEventListener('click', function() {
    if (marcadorLocalAtual) {
        buscarPadaria(latMarcador, lonMarcador);
    } else {
        alert('Por favor, adicione um marcador no mapa primeiro.');

    }
});