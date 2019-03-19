sigmaInitCallback = function(s) {
    sigma_instance.refresh();
    sigma_instance.startForceAtlas2({
        worker: true,
        barnesHutOptimize: true,
        // startingIterations: 50,
        scalingRatio: 200,
        iterationsPerRender: 10
    });
    // window.setTimeout(sigma_instance.killForceAtlas2(), 20000);
}

var sigma_instance = new sigma({
    renderer: {
        container: document.getElementById('container')
    },
    settings: {
        drawEdges: false,
        drawLabels: false,
        scalingMode: "outside",
        maxNodeSize: 1
    }
});

sigma.parsers.json('data/data.json', sigma_instance, sigmaInitCallback);