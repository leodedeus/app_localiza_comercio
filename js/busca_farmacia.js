function buscarFarmacia(lat, lon) {
    const url = `https://overpass-api.de/api/interpreter?data=[out:json];(
        node["amenity"="pharmacy"](around:3000,${lat},${lon});
        way["amenity"="pharmacy"](around:3000,${lat},${lon});
        relation["amenity"="pharmacy"](around:3000,${lat},${lon});
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
            data.elements.forEach(function(farmacia) {
                if (farmacia.type === "node") {
                    // Se for um nó, temos latitude e longitude
                    if (farmacia.lat && farmacia.lon) {
                        let marker = L.marker([farmacia.lat, farmacia.lon], { icon: iconMarcadorFarmacia }).addTo(map)
                            .bindPopup('Farmácia: ' + (farmacia.tags.name || 'Desconhecido'));
                        marcadorFarmacias.push(marker);
                        bounds.extend([farmacia.lat, farmacia.lon]);
                    }
                } else if (farmacia.type === "way") {
                    // Para "ways", verificamos se existe "center"
                    if (farmacia.nodes) {
                        console.log(farmacia.tags.name, farmacia.nodes)
                        const firstNodeId = farmacia.nodes[0]
                        console.log(`Primeiro nó: ${firstNodeId}`)
                        const urlNode = `https://overpass-api.de/api/interpreter?data=[out:json];node(${firstNodeId});out;`;
                        console.log(`Url do no: ${urlNode}`)
                        fetch(urlNode)
                            .then(response => response.json())
                            .then(data => {
                                data.elements.forEach(function(node) {
                                    if (node.lat && node.lon) {
                                        let marker = L.marker([node.lat, node.lon], { icon: iconMarcadorFarmacia }).addTo(map)
                                        .bindPopup('Farmácia: : ' + (farmacia.tags.name || 'Desconhecido'));
                                    marcadorFarmacias.push(marker);
                                    bounds.extend([node.lat, node.lon]);
                                    }
                                });
                            });
                    } else {
                        console.log('Way encontrado, mas sem centro definido.');
                    }
                } else if (farmacia.type === "relation") {
                    // Similar para relações, verificar centro
                    if (farmacia.center) {
                        let marker = L.marker([farmacia.center.lat, farmarcia.center.lon], { icon: iconMarcadorFarmacia }).addTo(map)
                            .bindPopup('Farmácia (Relação): ' + (farmacia.tags.name || 'Desconhecido'));
                        marcadorFarmacias.push(marker);
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
            console.error('Erro ao buscar farmácias:', error);
        })
        .finally(() => {
            // Oculte o loader somente após todas as promessas serem resolvidas
            Promise.all(promises).then(() => {
                document.getElementById('loader').style.display = 'none';
            });
        });
}

// Lida com o clique no botão
document.getElementById('searchFarmaciaBtn').addEventListener('click', function() {
    if (marcadorLocalAtual) {
        buscarFarmacia(latMarcador, lonMarcador);
    } else {
        alert('Por favor, adicione um marcador no mapa primeiro.');

    }
});