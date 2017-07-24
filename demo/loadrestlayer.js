/**
 * Created by yuanjs on 2017/7/19.
 */

requirejs(['../src/WorldWind',
        '../examples/LayerManager'],
    function (ww,
              LayerManager) {
        "use strict";

        WorldWind.Logger.setLoggingLevel(WorldWind.Logger.LEVEL_WARNING);

        var wwd = new WorldWind.WorldWindow("canvasOne");

        var config={
            // sector:new WorldWind.Sector(34.378499,38.308043,114.817738,122.72131),
            levelZerotTileDelta:new WorldWind.Location(90,-180),
             numLevels:16,
            imageFormat : "image/jpeg",
            tileWidth:512,
            tileHeight:512
        };
        var url="http://services.arcgisonline.com/arcgis/rest/services/ESRI_Imagery_World_2D/MapServer";
        var restlayer1=new WorldWind.RestTiledImageLayer(url,"tile","Layers",config);
         // restlayer1.detailControl=96;
         //  restlayer1.isPrePopulated(wwd);
        var layers = [
           // {layer: new WorldWind.BMNGLayer(),enabled: true},
            {layer: restlayer1, enabled: true},
            {layer: new WorldWind.CompassLayer(), enabled: true},
            {layer: new WorldWind.CoordinatesDisplayLayer(wwd), enabled: true}//,
            // {layer: new WorldWind.ViewControlsLayer(wwd), enabled: true}
        ];
        for (var l = 0; l < layers.length; l++) {
            layers[l].layer.enabled = layers[l].enabled;
            wwd.addLayer(layers[l].layer);
        }

        // Create a layer manager for controlling layer visibility.
        // var layerManger = new LayerManager(wwd);
        //wwd.goTo(new WorldWind.Location(35,116));
        // var gta=new WorldWind.GoToAnimator(wwd);
        // gta.animationFrequency=10;
        // gta.travelTime=4000;
        // gta.goTo(new WorldWind.Location(35,116));
    });