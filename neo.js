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

    var nNodes = sigma_instance.graph.nodes().length

    const config = {
        nodeMargin: 10.0,
        scaleNodes: 2.3,
        duration: 100,
        speed: 6,
        easing: "cubicInOut",
        gridSize: 10
    };

    var listener = sigma_instance.configNoverlap(config);

    if (nNodes > 500) {
        if (confirm("This graph is too large to recompute the layout. It contains " + nNodes + " nodes. Are you sure you want to continue?")) {
            sigma_instance.startNoverlap();
        } else {
            return;
        }
    } else {
        sigma_instance.startNoverlap();
    }
}

function saveGEXF() {
    console.log(sigma_instance.toGEXF({
        download: true,
        filename: 'myGraph.gexf',
        nodeAttributes: 'neo4j_data',
        edgeAttributes: 'neo4j_data',
        renderer: sigma_instance.renderers[0],
        creator: 'Sigma.js',
        description: 'This is an awesome graph!'
    }));
}

function queryNeo4J() {
    stopLayout(); // stop previously running layout plugin
    var query = document.getElementById("queryInput").value;
    sigma.neo4j.cypher({ url: 'http://localhost:7474', user: 'neo4j', password: '20121967' },
    query,
    sigma_instance,
    sigmaInitCallback);
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
        labelThreshold: 10
    }
}

sigmaInitCallback = function(s) {
    sigma_instance.refresh();
    sigma_instance.startForceAtlas2(forceAtlas2Config);
    console.log(sigma_instance.graph.nodes().length);
}

var sigma_instance = new sigma(sigmaConfig);

// sigma.parsers.json('data/ga.json', sigma_instance, sigmaInitCallback);

