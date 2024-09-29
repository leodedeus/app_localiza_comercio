function buscarSupermercados(lat, lon) {
    const url = `https://overpass-api.de/api/interpreter?data=[out:json];(
        node["shop"="supermarket"](around:3000,${lat},${lon});
        way["shop"="supermarket"](around:3000,${lat},${lon});
        relation["shop"="supermarket"](around:3000,${lat},${lon});
    );out body;`;
    console.log(`Url buscada: ${url}`)

    const bounds = L.latLngBounds();

    fetch(url)
        .then(response => response.json())
        .then(data => {
            data.elements.forEach(function(supermercado) {
                if (supermercado.type === "node") {
                    // Se for um nó, temos latitude e longitude
                    if (supermercado.lat && supermercado.lon) {
                        marcadorSupermercadosA = L.marker([supermercado.lat, supermercado.lon], { icon: iconMarcadorSupermercado }).addTo(map)
                            .bindPopup('Supermercado: ' + (supermercado.tags.name || 'Desconhecido'));
                        bounds.extend([supermercado.lat, supermercado.lon]);
                    }
                } else if (supermercado.type === "way") {
                    // Para "ways", verificamos se existe "center"
                    if (supermercado.nodes) {
                        console.log(supermercado.tags.name, supermercado.nodes)
                        const firstNodeId = supermercado.nodes[0]
                        console.log(`Primeiro nó: ${firstNodeId}`)
                        const urlNode = `https://overpass-api.de/api/interpreter?data=[out:json];node(${firstNodeId});out;`;
                        console.log(`Url do no: ${urlNode}`)
                        fetch(urlNode)
                            .then(response => response.json())
                            .then(data => {
                                data.elements.forEach(function(node) {
                                    if (node.lat && node.lon) {
                                        marcadorSupermercadosB = L.marker([node.lat, node.lon], { icon: iconMarcadorSupermercado }).addTo(map)
                                        .bindPopup('Supermercado: ' + (supermercado.tags.name || 'Desconhecido'));
                                    bounds.extend([node.lat, node.lon]);
                                    }
                                });
                            });
                    } else {
                        console.log('Way encontrado, mas sem centro definido.');
                    }
                } else if (supermercado.type === "relation") {
                    // Similar para relações, verificar centro
                    if (supermercado.center) {
                        marcadorSupermercadosC = L.marker([supermercado.center.lat, supermercado.center.lon], { icon: iconMarcadorSupermercado }).addTo(map)
                            .bindPopup('Supermercado (Relação): ' + (supermercado.tags.name || 'Desconhecido'));
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
document.getElementById('searchSupermercadoBtn').addEventListener('click', function() {
    if (marcadorLocalAtual) {
        buscarSupermercados(latMarcador, lonMarcador);
    } else {
        alert('Por favor, adicione um marcador no mapa primeiro.');

    }
});