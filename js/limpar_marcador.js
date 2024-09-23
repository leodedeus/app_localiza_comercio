document.getElementById('limparMarcadorBtn').addEventListener('click', function() {
    if (marcadorLocalAtual) {
        map.removeLayer(marcadorLocalAtual);
    }
});