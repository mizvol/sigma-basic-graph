sigmaInitCallback = function(s) {
    sigma_instance.refresh();
    sigma_instance.startForceAtlas2({
        worker: true,
        barnesHutOptimize: true,
        scalingRatio: 20
    });
}

var sigma_instance = new sigma({
    renderer: {
        container: document.getElementById('container')
    },
    settings: {
        drawEdges: false,
        drawLabels: false
    }
});

sigma.parsers.json('data/data.json', sigma_instance, sigmaInitCallback);