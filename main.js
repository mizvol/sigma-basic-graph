// Force Atlas readme: https://github.com/Linkurious/linkurious.js/tree/linkurious-version/plugins/sigma.layout.forceAtlas2

forceAtlas2Config = {
        barnesHutOptimize: true,
        scalingRatio: 200
    }

sigmaInitCallback = function(s) {
    sigma_instance.refresh();
    sigma_instance.startForceAtlas2(forceAtlas2Config);
}

function stopLayout(){
    sigma_instance.killForceAtlas2();
}

function restartLayout(){
    sigma_instance.startForceAtlas2(forceAtlas2Config);
}


// Sigma settings: https://github.com/jacomyal/sigma.js/wiki/Settings
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