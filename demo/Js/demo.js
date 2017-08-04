/**
 * Created by yuanjs on 2017/8/4.
 */
requirejs([
    '../../src/WorldWind','../Js/building',"../Js/Road","../Js/Tree"
],function(ww,Building,Road,Tree) {
    "use strict";

    //初始化控件
    WorldWind.Logger.setLoggingLevel(WorldWind.Logger.LEVEL_WARNING);
    var wwd = new WorldWind.WorldWindow("canvasOne");
    //初始化图层
    var layers = [
        //{layer: new WorldWind.BMNGLayer(), enabled: true},
        {layer: new WorldWind.TiandituLayer(), enabled: true},
        {layer: new WorldWind.CompassLayer(), enabled: true},
        {layer: new WorldWind.CoordinatesDisplayLayer(wwd), enabled: true},
        {layer: new WorldWind.ViewControlsLayer(wwd), enabled: true}
    ];

    for (var l = 0; l < layers.length; l++) {
        layers[l].layer.enabled = layers[l].enabled;
        wwd.addLayer(layers[l].layer);
    }

    var building=new Building(wwd);
    building.loadShp("./shapefile/house1.shp","height");

    var boundary = [];
    boundary.push(new WorldWind.Location(36.66098942981116, 117.135543660008202));
    boundary.push(new WorldWind.Location(36.6610679, 117.1358425));
    boundary.push(new WorldWind.Location(36.66958, 117.129434));
    boundary.push(new WorldWind.Location(36.669475, 117.1292725));
    var road=new Road(wwd,building.Layer);
    road.drawRoad(boundary);

    var pts=[];
    pts.push(new WorldWind.Position(36.66098942981116, 117.135543660008202,1e2));
    pts.push(new WorldWind.Position(36.6610679, 117.1358425,1e2));
    pts.push(new WorldWind.Position(36.66958, 117.129434,1e2));
    pts.push(new WorldWind.Position(36.669475, 117.1292725,1e2));


    var tree=new Tree(wwd);
    tree.drawTree(pts);

    wwd.navigator.tilt=75;
    wwd.goTo(new WorldWind.Position(36.665,117.136, 2e3));
});