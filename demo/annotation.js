/**
 * Created by yuanjs on 2017/7/31.
 */
requirejs([
    '../src/WorldWind'
],function(ww){
    "use strict";

    WorldWind.Logger.setLoggingLevel(WorldWind.Logger.LEVEL_WARNING);

    var wwd = new WorldWind.WorldWindow("canvasOne");

    var layers = [
        {layer: new WorldWind.TiandituLayer(), enabled: true},
        {layer: new WorldWind.CompassLayer(), enabled: true},
        {layer: new WorldWind.CoordinatesDisplayLayer(wwd), enabled: true},
        {layer: new WorldWind.ViewControlsLayer(wwd), enabled: true}
    ];

    for (var l = 0; l < layers.length; l++) {
        layers[l].layer.enabled = layers[l].enabled;
        wwd.addLayer(layers[l].layer);
    }
    var annotationAttributes = new WorldWind.AnnotationAttributes(null);
    annotationAttributes.cornerRadius = 14;//设置指示框角弧度
    annotationAttributes.backgroundColor = WorldWind.Color.BLUE;//设置背景色
    annotationAttributes.drawLeader = true;//是否显示指示框
    annotationAttributes.leaderGapWidth = 40;//指示框的指示尖宽度
    annotationAttributes.leaderGapHeight = 30;//指示框的指示尖高度
    annotationAttributes.opacity = 1;//设置不透明度
    annotationAttributes.scale = 1;//设置比例尺
    annotationAttributes.width = 200;//设置宽度
    annotationAttributes.height = 100;//设置高度
    annotationAttributes.textAttributes.color = WorldWind.Color.WHITE;
    annotationAttributes.insets = new WorldWind.Insets(10, 10, 10, 10);//指示框内部的padding

    // Set a location for the annotation to point to and create it.
    var location = new WorldWind.Position(39.912984627,116.3909252265, 1e2);
    var annotation = new WorldWind.Annotation(location, annotationAttributes);
    // Text can be assigned to the annotation after creating it.
    annotation.label = "这里是故宫。\n这里是午门。";

    // Create and add the annotation layer to the World Window's layer list
    var annotationsLayer = new WorldWind.RenderableLayer("Annotations");
    annotationsLayer.addRenderable(annotation);
    wwd.addLayer(annotationsLayer);

    var flyto=new WorldWind.Position();
    flyto=flyto.copy(location);
    flyto.altitude =1e6;
    wwd.goTo(flyto);

});