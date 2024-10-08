document.getElementById('limparMarcadorBtn').addEventListener('click', function() {
    if (marcadorLocalAtual) {
        map.removeLayer(marcadorLocalAtual);
        //map.setView([-15.836104636023594, -48.039736747741706], 12)
    }
});

document.getElementById('limparSupermercadoBtn').addEventListener('click', function() {
    marcadorSupermercados.forEach(function(marker) {
        map.removeLayer(marker);
    });
    marcadorSupermercados = [];
});

document.getElementById('limparPadariaBtn').addEventListener('click', function() {
    marcadorPadarias.forEach(function(marker) {
        map.removeLayer(marker);
    });
    marcadorPadarias = [];
});

document.getElementById('limparFarmaciaBtn').addEventListener('click', function() {
    marcadorFarmacias.forEach(function(marker) {
        map.removeLayer(marker);
    });
    marcadorFarmacias = [];
});