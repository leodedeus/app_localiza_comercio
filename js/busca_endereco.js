// Variável global para armazenar o marcador atual
//var marcadorAtual = null;

// Função para buscar o endereço
function buscarEndereco(endereco) {
    var url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(endereco)}&format=json&addressdetails=1`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao buscar o endereço');
            }
            return response.json();
        })
        .then(data => {
            if (data.length > 0) {
                latMarcador = data[0].lat;
                lonMarcador = data[0].lon;
                console.log(`Coordenadas do endereço: ${latMarcador}, ${lonMarcador}`)

                // Se houver um marcador existente, removê-lo
                if (marcadorLocalAtual) {
                    map.removeLayer(marcadorLocalAtual);
                }

                //Adiciona um novo marcador com endereço atual
                marcadorLocalAtual = L.marker([latMarcador, lonMarcador], { icon: iconMarcadorLocalAtual, draggable: true }).addTo(map)
                    .bindPopup(data[0].display_name)
                    .openPopup();

                map.setView([latMarcador, lonMarcador], 15);

                // Lidar com o evento de arrastar o marcador
                marcadorLocalAtual.on('dragend', function(event) {
                    var newLatLng = event.target.getLatLng();
                    latMarcador = newLatLng.lat;
                    lonMarcador = newLatLng.lng;
                    map.setView([newLatLng.lat, newLatLng.lng], 15);
                    console.log(`Marcador movido para: ${latMarcador}, ${lonMarcador}`);
                });
            } else {
                alert('Endereço não encontrado');
            }
        })
        .catch(error => {
            console.error('Erro:', error);
            alert('Erro ao buscar o endereço');
        })
        .finally(() => {
            // Limpa o valor do campo de endereço
            document.getElementById('address').value = '';
        });
}

// Lida com o clique no botão
document.getElementById('searchEndBtn').addEventListener('click', function() {
    var endereco = document.getElementById('address').value;
    if (endereco) {
        buscarEndereco(endereco);
    } else {
        alert('Por favor, digite um endereço');
    }
});
