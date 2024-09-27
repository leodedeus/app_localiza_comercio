document.getElementById('limparMarcadorBtn').addEventListener('click', function() {
    if (marcadorLocalAtual) {
        map.removeLayer(marcadorLocalAtual);
        map.setView([-15.836104636023594, -48.039736747741706], 12)
    }
});