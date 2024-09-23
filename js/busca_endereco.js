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
                var lat = data[0].lat;
                var lon = data[0].lon;

                // Se houver um marcador existente, removê-lo
                if (marcadorLocalAtual) {
                    map.removeLayer(marcadorLocalAtual);
                }

                //Adiciona um novo marcador com endereço atual
                marcadorLocalAtual = L.marker([lat, lon]).addTo(map)
                    .bindPopup(data[0].display_name)
                    .openPopup();

                map.setView([lat, lon], 12);
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
