document.getElementById('limparMarcadorBtn').addEventListener('click', function() {
    if (marcadorLocalAtual) {
        map.removeLayer(marcadorLocalAtual);
        map.setView([-15.836104636023594, -48.039736747741706], 12)
    }
});

document.getElementById('limparSupermercadoBtn').addEventListener('click', function() {
    if (marcadorSupermercadosA) {
        map.removeLayer(marcadorSupermercadosA);
    }
    if (marcadorSupermercadosB) {
        map.removeLayer(marcadorSupermercadosB);
    }
    if (marcadorSupermercadosC) {
        map.removeLayer(marcadorSupermercadosC);
    }
});

document.getElementById('limparPadariaBtn').addEventListener('click', function() {
    if (marcadorPadariasA) {
        map.removeLayer(marcadorPadariasA);
    }
    if (marcadorPadariasB) {
        map.removeLayer(marcadorPadariasB);
    }
    if (marcadorPadariasC) {
        map.removeLayer(marcadorPadariasC);
    }
});