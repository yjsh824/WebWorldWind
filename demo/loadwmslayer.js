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
            service:'http://192.152.1.12/Proxy/proxy.ashx?http://10.68.7.162:6080/arcgis/services/world/MapServer/WMSServer?',
            layerNames:"0",
            sector:new WorldWind.Sector(-90,90,-180,180),
            levelZeroDelta:new WorldWind.Location(39,116),
            numLevels:19,
            format:"image/jpeg",
            size:256,
            coordinateSystem:"EPSG:4326",
            styleNames:"default"
        };
        var wmslayer=new WorldWind.WmsLayer(config);
        var config1={
            service:'http://192.152.1.12/Proxy/proxy.ashx?http://10.68.7.162:6080/arcgis/services/ShanDong/ShandongMap/MapServer/WMSServer?',
            layerNames:"0",
            sector:new WorldWind.Sector(34.378499,38.308043,114.817738,122.72131),
            levelZeroDelta:new WorldWind.Location(35,116),
            numLevels:15,
            format:"image/png",
            size:256,
            coordinateSystem:"EPSG:4326",
            styleNames:"default"
        };
        var wmslayer1=new WorldWind.WmsLayer(config1);
      
        var layers = [
            //{layer: new WorldWind.BMNGLayer(), enabled: true},
            {layer: wmslayer, enabled: true},
            {layer: wmslayer1, enabled: true},
            {layer: new WorldWind.CompassLayer(), enabled: true},
            {layer: new WorldWind.CoordinatesDisplayLayer(wwd), enabled: true},
            {layer: new WorldWind.ViewControlsLayer(wwd), enabled: true}
        ];
        for (var l = 0; l < layers.length; l++) {
            layers[l].layer.enabled = layers[l].enabled;
            wwd.addLayer(layers[l].layer);
        }
        wwd.goTo(new WorldWind.Location(35,116));
        // var gta=new WorldWind.GoToAnimator(wwd);
        // gta.animationFrequency=10;
        // gta.travelTime=4000;
        // gta.goTo(new WorldWind.Location(35,116));
    });