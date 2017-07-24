/**
 * Created by yuanjs on 2017/7/24.
 */

requirejs([
        '../src/WorldWind'
    ],
    function (ww) {
        "use strict";

        WorldWind.Logger.setLoggingLevel(WorldWind.Logger.LEVEL_WARNING);

        var wwd = new WorldWind.WorldWindow("canvasOne");

        var layers = [
            {layer: new WorldWind.BMNGLayer(), enabled: true},
            {layer: new WorldWind.CompassLayer(), enabled: true},
            {layer: new WorldWind.CoordinatesDisplayLayer(wwd), enabled: true},
            {layer: new WorldWind.ViewControlsLayer(wwd), enabled: true}
        ];

        for (var l = 0; l < layers.length; l++) {
            layers[l].layer.enabled = layers[l].enabled;
            wwd.addLayer(layers[l].layer);
        }

        var modelLayer = new WorldWind.RenderableLayer("model");
        wwd.addLayer(modelLayer);

        var position = new WorldWind.Position(45, -100,10e2);
        var colladaLoader = new WorldWind.ColladaLoader(position);
        colladaLoader.init({dirPath: '../examples/collada_models/duck/'});
        colladaLoader.load('duck.dae', function (scene) {
            scene.scale = 5000;
            scene.xRotation=90;
            modelLayer.addRenderable(scene);
        });

    });