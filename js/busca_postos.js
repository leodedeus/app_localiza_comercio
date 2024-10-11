function buscarPostos(lat, lon) {
    const url = `https://overpass-api.de/api/interpreter?data=[out:json];(
        node["amenity"="fuel"](around:3000,${lat},${lon});
        way["amenity"="fuel"](around:3000,${lat},${lon});
        relation["amenity"="fuel"](around:3000,${lat},${lon});
    );out body;`;
    console.log(`Url buscada: ${url}`)

    const bounds = L.latLngBounds();

    // Mostra o loader
    document.getElementById('loader').style.display = 'flex';

    // Cria um array para armazenar as promessas
    const promises = [];

    fetch(url)
        .then(response => response.json())
        .then(data => {
            data.elements.forEach(function(posto) {
                if (posto.type === "node") {
                    // Se for um nó, temos latitude e longitude
                    if (posto.lat && posto.lon) {
                        let marker = L.marker([posto.lat, posto.lon], { icon: iconMarcadorPosto }).addTo(map)
                            .bindPopup('Posto: ' + (posto.tags.name || 'Desconhecido'));
                        marcadorPostos.push(marker);
                        bounds.extend([posto.lat, posto.lon]);
                    }
                } else if (posto.type === "way") {
                    // Para "ways", verificamos se existe "center"
                    if (posto.nodes) {
                        console.log(posto.tags.name, posto.nodes)
                        const firstNodeId = posto.nodes[0]
                        console.log(`Primeiro nó: ${firstNodeId}`)
                        const urlNode = `https://overpass-api.de/api/interpreter?data=[out:json];node(${firstNodeId});out;`;
                        console.log(`Url do no: ${urlNode}`)
                        
                        promises.push(
                            fetch(urlNode)
                                .then(response => response.json())
                                .then(data => {
                                    data.elements.forEach(function(node) {
                                        if (node.lat && node.lon) {
                                            let marker = L.marker([node.lat, node.lon], { icon: iconMarcadorPosto }).addTo(map)
                                                .bindPopup('Posto: ' + (posto.tags.name || 'Desconhecido'));
                                            marcadorPostos.push(marker);
                                            bounds.extend([node.lat, node.lon]);
                                        }
                                    });
                                })
                        );
                    } else {
                        console.log('Way encontrado, mas sem centro definido.');
                    }
                } else if (posto.type === "relation") {
                    // Similar para relações, verificar centro
                    if (posto.center) {
                        let marker = L.marker([posto.center.lat, posto.center.lon], { icon: iconMarcadorPosto }).addTo(map)
                            .bindPopup('Posto (Relação): ' + (posto.tags.name || 'Desconhecido'));
                        marcadorPostos.push(marker);
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
            console.error('Erro ao buscar postos:', error);
        })
        .finally(() => {
            // Oculte o loader somente após todas as promessas serem resolvidas
            Promise.all(promises).then(() => {
                document.getElementById('loader').style.display = 'none';
            });
        });
}

// Lida com o clique no botão
document.getElementById('searchPostosBtn').addEventListener('click', function() {
    if (marcadorLocalAtual) {
        buscarPostos(latMarcador, lonMarcador);
    } else {
        alert('Por favor, adicione um marcador no mapa primeiro.');

    }
});