/**
 * Created by yuanjs on 2017/7/31.
 */
define([
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


    // Create a layer to hold the polygons.
    var polygonsLayer = new WorldWind.RenderableLayer();
    polygonsLayer.displayName = "Polygons";
    wwd.addLayer(polygonsLayer);

    // // Define an outer and an inner boundary to make a polygon with a hole.
    // var boundaries = [];
    // boundaries[0] = []; // outer boundary
    // boundaries[0].push(new WorldWind.Position(40, -100, 1e5));
    // boundaries[0].push(new WorldWind.Position(45, -110, 1e5));
    // boundaries[0].push(new WorldWind.Position(40, -120, 1e5));
    // boundaries[1] = []; // inner boundary
    // boundaries[1].push(new WorldWind.Position(41, -103, 1e5));
    // boundaries[1].push(new WorldWind.Position(44, -110, 1e5));
    // boundaries[1].push(new WorldWind.Position(41, -117, 1e5));
    //
    // // Create the polygon and assign its attributes.
    //
    // var polygon = new WorldWind.Polygon(boundaries, null);
    // polygon.altitudeMode = WorldWind.ABSOLUTE;
    // polygon.extrude = true; // extrude the polygon edges to the ground
    //
    // var polygonAttributes = new WorldWind.ShapeAttributes(null);
    // polygonAttributes.drawInterior = true;
    // polygonAttributes.drawOutline = true;
    // polygonAttributes.outlineColor = WorldWind.Color.BLUE;
    // polygonAttributes.interiorColor = new WorldWind.Color(0, 1, 1, 0.5);
    // polygonAttributes.drawVerticals = polygon.extrude;
    // polygonAttributes.applyLighting = true;
    // polygon.attributes = polygonAttributes;
    //
    // // Create and assign the polygon's highlight attributes.
    // var highlightAttributes = new WorldWind.ShapeAttributes(polygonAttributes);
    // highlightAttributes.outlineColor = WorldWind.Color.RED;
    // highlightAttributes.interiorColor = new WorldWind.Color(1, 1, 1, 0.5);
    // polygon.highlightAttributes = highlightAttributes;

    // Add the polygon to the layer and the layer to the World Window's layer list.
    //polygonsLayer.addRenderable(polygon);

    // 绘制面并延伸至地面
    var boundaries = [];
    boundaries[0] = []; // outer boundary
    boundaries[0].push(new WorldWind.Position(40, -90, 1e5));
    boundaries[0].push(new WorldWind.Position(40, -80, 1e5));
    boundaries[0].push(new WorldWind.Position(45, -80, 1e5));
    boundaries[0].push(new WorldWind.Position(45, -90, 1e5));

    var polygon = new WorldWind.Polygon(boundaries, null);
    polygon.altitudeMode = WorldWind.ABSOLUTE;
    polygon.extrude = true;
    polygon.textureCoordinates = [
        [new WorldWind.Vec2(0, 0), new WorldWind.Vec2(1, 0), new WorldWind.Vec2(1, 1), new WorldWind.Vec2(0, 1)]
    ];

    var polygonAttributes = new WorldWind.ShapeAttributes(null);
    // Specify a texture for the polygon and its four extruded sides.
    polygonAttributes.imageSource = [
        "../images/400x230-splash-nww.png", // polygon texture image
        "../images/400x230-splash-nww.png", // first-side texture image
        "../images/400x230-splash-nww.png", // second-side texture image
        "../images/400x230-splash-nww.png", // third-side texture image
        "../images/400x230-splash-nww.png"  // fourth-side texture image
    ];
    polygonAttributes.drawInterior = true;
    polygonAttributes.drawOutline = true;
    polygonAttributes.outlineColor = WorldWind.Color.BLUE;
    polygonAttributes.interiorColor = WorldWind.Color.WHITE;
    polygonAttributes.drawVerticals = polygon.extrude;
    polygonAttributes.applyLighting = true;
    polygon.attributes = polygonAttributes;
    var highlightAttributes = new WorldWind.ShapeAttributes(polygonAttributes);
    highlightAttributes.outlineColor = WorldWind.Color.RED;
    polygon.highlightAttributes = highlightAttributes;

    polygonsLayer.addRenderable(polygon);


    // 创建一个中空的多边形面
    boundaries = [];
    boundaries[0] = []; // outer boundary
    boundaries[0].push(new WorldWind.Position(30, -100, 1e5));
    boundaries[0].push(new WorldWind.Position(30, -90, 1e5));
    boundaries[0].push(new WorldWind.Position(35, -90, 1e5));
    boundaries[0].push(new WorldWind.Position(35, -100, 1e5));
    boundaries[1] = []; // inner boundary
    boundaries[1].push(new WorldWind.Position(32, -96, 1e5));
    boundaries[1].push(new WorldWind.Position(32, -94, 1e5));
    boundaries[1].push(new WorldWind.Position(33, -94, 1e5));
    boundaries[1].push(new WorldWind.Position(33, -96, 1e5));


    polygon = new WorldWind.Polygon(boundaries, null);
    polygon.altitudeMode = WorldWind.ABSOLUTE;
    polygon.extrude = true;
    polygon.textureCoordinates = [
        [new WorldWind.Vec2(0, 0), new WorldWind.Vec2(1, 0), new WorldWind.Vec2(1, 1), new WorldWind.Vec2(0, 1)],
        [new WorldWind.Vec2(0.4, 0.4), new WorldWind.Vec2(0.6, 0.4), new WorldWind.Vec2(0.6, 0.6),
            new WorldWind.Vec2(0.4, 0.6)]
    ];

    polygonAttributes = new WorldWind.ShapeAttributes(null);
    polygonAttributes.imageSource = ["../images/400x230-splash-nww.png","../images/400x230-splash-nww.png"];
    polygonAttributes.drawInterior = true;
    polygonAttributes.drawOutline = true;
    polygonAttributes.outlineColor = WorldWind.Color.BLUE;
    polygonAttributes.interiorColor = WorldWind.Color.WHITE;
    polygonAttributes.drawVerticals = polygon.extrude;
    polygonAttributes.applyLighting = true;
    polygon.attributes = polygonAttributes;
    highlightAttributes = new WorldWind.ShapeAttributes(polygonAttributes);
    highlightAttributes.outlineColor = WorldWind.Color.RED;
    polygon.highlightAttributes = highlightAttributes;
    var annotation;
    polygon.hideAnnotation=function(){
        polygonsLayer.removeRenderable(annotation);
    };
    polygon.showAnnotation=function(){
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
        annotation = new WorldWind.Annotation(new WorldWind.Position(30, -100, 1e5), annotationAttributes);
        // Text can be assigned to the annotation after creating it.
        annotation.label = "这里是故宫。\n这里是午门。";

        // Create and add the annotation layer to the World Window's layer list
        //var annotationsLayer = new WorldWind.RenderableLayer("Annotations");
        polygonsLayer.addRenderable(annotation);
    }

    polygonsLayer.addRenderable(polygon);

    var surfaceImage1 = new WorldWind.SurfaceImage(new WorldWind.Sector(40, 50, -120, -100),
        "../images/400x230-splash-nww.png");
    polygonsLayer.addRenderable(surfaceImage1);
    //
    // // Create a textured polygon with a hole at the north pole. Extrude the boundaries and apply a dynamically
    // // created texture to them.
    // boundaries = [];
    // boundaries[0] = []; // outer boundary
    // boundaries[0].push(new WorldWind.Position(85, -45, 1e5));
    // boundaries[0].push(new WorldWind.Position(85, +45, 1e5));
    // boundaries[0].push(new WorldWind.Position(85, +135, 1e5));
    // boundaries[0].push(new WorldWind.Position(85, -135, 1e5));
    // boundaries[1] = []; // inner boundary
    // boundaries[1].push(new WorldWind.Position(89, -45, 1e5));
    // boundaries[1].push(new WorldWind.Position(89, +45, 1e5));
    // boundaries[1].push(new WorldWind.Position(89, +135, 1e5));
    // boundaries[1].push(new WorldWind.Position(89, -135, 1e5));
    //
    // polygon = new WorldWind.Polygon(boundaries, null);
    // polygon.altitudeMode = WorldWind.ABSOLUTE;
    // polygon.extrude = true;
    // polygon.textureCoordinates = [
    //     [new WorldWind.Vec2(0, 0), new WorldWind.Vec2(1, 0), new WorldWind.Vec2(1, 1), new WorldWind.Vec2(0, 1)],
    //     [new WorldWind.Vec2(0.4, 0.4), new WorldWind.Vec2(0.6, 0.4), new WorldWind.Vec2(0.6, 0.6),
    //         new WorldWind.Vec2(0.4, 0.6)]
    // ];
    //
    // // Create a custom image for the extruded sides.
    //
    // var canvas = document.createElement("canvas"),
    //     ctx2d = canvas.getContext("2d"),
    //     size = 64, c = size / 2  - 0.5, innerRadius = 5, outerRadius = 20;
    //
    // canvas.width = size;
    // canvas.height = size;
    //
    // var gradient = ctx2d.createRadialGradient(c, c, innerRadius, c, c, outerRadius);
    // gradient.addColorStop(0, 'rgb(255, 0, 0)');
    // gradient.addColorStop(0.5, 'rgb(0, 255, 0)');
    // gradient.addColorStop(1, 'rgb(255, 0, 0)');
    //
    // ctx2d.fillStyle = gradient;
    // ctx2d.arc(c, c, outerRadius, 0, 2 * Math.PI, false);
    // ctx2d.fill();
    //
    // polygonAttributes = new WorldWind.ShapeAttributes(null);
    // polygonAttributes.imageSource = [
    //     "../images/400x230-splash-nww.png",
    //     new WorldWind.ImageSource(canvas)
    // ];
    // polygonAttributes.drawInterior = true;
    // polygonAttributes.drawOutline = true;
    // polygonAttributes.outlineColor = WorldWind.Color.BLUE;
    // polygonAttributes.interiorColor = WorldWind.Color.WHITE;
    // polygonAttributes.drawVerticals = polygon.extrude;
    // polygonAttributes.applyLighting = true;
    // polygon.attributes = polygonAttributes;
    // highlightAttributes = new WorldWind.ShapeAttributes(polygonAttributes);
    // highlightAttributes.outlineColor = WorldWind.Color.RED;
    // polygon.highlightAttributes = highlightAttributes;
    //
    // polygonsLayer.addRenderable(polygon);

    // Now set up to handle highlighting.
    var highlightController = new WorldWind.HighlightController(wwd);
});