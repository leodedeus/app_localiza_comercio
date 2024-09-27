function buscarSupermercados(lat, lon) {
    const url = `https://overpass-api.de/api/interpreter?data=[out:json];(
        node["shop"="supermarket"](around:3000,${lat},${lon});
        way["shop"="supermarket"](around:3000,${lat},${lon});
        relation["shop"="supermarket"](around:3000,${lat},${lon});
    );out body;`;
    console.log(`Url buscada: ${url}`)

    fetch(url)
        .then(response => response.json())
        .then(data => {
            data.elements.forEach(function(supermercado) {
                if (supermercado.type === "node") {
                    // Se for um nó, temos latitude e longitude
                    if (supermercado.lat && supermercado.lon) {
                        L.marker([supermercado.lat, supermercado.lon]).addTo(map)
                            .bindPopup('Supermercado: ' + (supermercado.tags.name || 'Desconhecido'))
                            .openPopup();
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
                                        L.marker([node.lat, node.lon]).addTo(map)
                                        .bindPopup('Supermercado: ' + (supermercado.tags.name || 'Desconhecido'))
                                        .openPopup();
                                    }
                                });
                            });
                    } else {
                        console.log('Way encontrado, mas sem centro definido.');
                    }
                } else if (supermercado.type === "relation") {
                    // Similar para relações, verificar centro
                    if (supermercado.center) {
                        L.marker([supermercado.center.lat, supermercado.center.lon]).addTo(map)
                            .bindPopup('Supermercado (Relação): ' + (supermercado.tags.name || 'Desconhecido'))
                            .openPopup();
                    } else {
                        console.log('Relação encontrada, mas sem centro definido.');
                    }
                }
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