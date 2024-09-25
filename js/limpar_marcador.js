document.getElementById('limparMarcadorBtn').addEventListener('click', function() {
    if (marcadorLocalAtual) {
        map.removeLayer(marcadorLocalAtual);
        map.setView([-18.916411, -48.273891], 12)
    }
});