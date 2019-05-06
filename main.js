// Force Atlas readme: https://github.com/Linkurious/linkurious.js/tree/linkurious-version/plugins/sigma.layout.forceAtlas2

forceAtlas2Config = {
    barnesHutOptimize: true,
    scalingRatio: 500
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
    // sigma_instance.startForceAtlas2(forceAtlas2Config);
}

var sigma_instance = new sigma(sigmaConfig);

sigma.parsers.json('data/2018-W18.json', sigma_instance, sigmaInitCallback);

function updateGraph () {
    var weekControl = document.querySelector('input[type="week"]');
    var week = weekControl.value;
    sigma.parsers.json('data/' + week + '.json', sigma_instance, sigmaInitCallback);
    sigma_instance.refresh();
}