// Force Atlas readme: https://github.com/Linkurious/linkurious.js/tree/linkurious-version/plugins/sigma.layout.forceAtlas2

forceAtlas2Config = {
    barnesHutOptimize: true,
    scalingRatio: 5000
    // outboundAttractionDistribution: true
}

function stopLayout() {
    sigma_instance.killForceAtlas2();
}

function restartLayout() {
    sigma_instance.startForceAtlas2(forceAtlas2Config);
}

function drawLabels() {
    sigma_instance.settings('drawLabels', true);
    sigma_instance.refresh();
}

function hideLabels() {
    sigma_instance.settings('drawLabels', false);
    sigma_instance.refresh();
}

function drawHideLabelsTrigger() {
    var checkBox = document.getElementById("drawHideLabelsCheckBox");
    if (checkBox.checked == true) {
        drawLabels();
    } else {
        hideLabels();
    }

}

function drawEdges() {
    sigma_instance.settings('drawEdges', true);
    sigma_instance.refresh();
}

function hideEdges() {
    sigma_instance.settings('drawEdges', false);
    sigma_instance.refresh();
}

function drawHideEdgesTrigger() {
    var checkBox = document.getElementById("drawHideEdgesCheckBox");
    if (checkBox.checked == true) {
        drawEdges();
    } else {
        hideEdges();
    }

}

function noverlap() {
    const config = {
        nodeMargin: 10.0,
        scaleNodes: 2.3,
        duration: 100,
        speed: 6,
        easing: "cubicInOut",
        gridSize: 10
    };

    var listener = sigma_instance.configNoverlap(config);

    sigma_instance.startNoverlap()
}

// Sigma settings: https://github.com/jacomyal/sigma.js/wiki/Settings

sigmaConfig = {
    renderer: {
        container: document.getElementById('container')
    },
    settings: {
        drawEdges: false,
        drawLabels: false,
        scalingMode: "outside",
        maxEdgeSize: 0.01,
        edgeColor: "source",
        labelThreshold: 3
    }
}

sigmaInitCallback = function(s) {
    sigma_instance.refresh();
    sigma_instance.startForceAtlas2(forceAtlas2Config);
}

var sigma_instance = new sigma(sigmaConfig);

// sigma.parsers.json('data/ga.json', sigma_instance, sigmaInitCallback);

sigma.neo4j.cypher({ url: 'http://localhost:7474', user: 'neo4j', password: '20121967' },
    "MATCH (p)-[r:BELONGS_TO*1..4]->(c:Category { title: 'Actors'}) RETURN p, r, c LIMIT 500",
    sigma_instance,
    sigmaInitCallback);