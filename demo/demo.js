/**
 * Created by yuanjs on 2017/7/31.
 */
requirejs([
    '../src/WorldWind'
],function(ww){
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



    // Set up the common placemark attributes.
    var placemarkAttributes = new WorldWind.PlacemarkAttributes(null);
    placemarkAttributes.imageScale = 0.025;
    placemarkAttributes.imageColor = WorldWind.Color.WHITE;
    placemarkAttributes.labelAttributes.offset = new WorldWind.Offset(
        WorldWind.OFFSET_FRACTION, 0.5,
        WorldWind.OFFSET_FRACTION, 1.0);
    placemarkAttributes.imageSource = WorldWind.configuration.baseUrl + "images/white-dot.png";


    //绘制楼房模型
    var drawpolygon=function(pts,height){
        var boundaries = [];
        boundaries[0] = []; // outer boundary


        for(var i=0;i<pts.length;i=i+2)
        {
            boundaries[0].push(new WorldWind.Position(pts[i+1],pts[i],height));
        }


        var polygon = new WorldWind.Polygon(boundaries, null);
        polygon.altitudeMode = WorldWind.RELATIVE_TO_GROUND;
        polygon.extrude = true;
        polygon.textureCoordinates = [
            [new WorldWind.Vec2(0, 0), new WorldWind.Vec2(1, 0), new WorldWind.Vec2(1, 1), new WorldWind.Vec2(0, 1)]
        ];

        var polygonAttributes = new WorldWind.ShapeAttributes(null);
        //Specify a texture for the polygon and its four extruded sides.
        polygonAttributes.imageSource = [
            "../images/texture1.jpg", // polygon texture image
            "../images/texture1.jpg", // first-side texture image
            "../images/texture1.jpg", // second-side texture image
            "../images/texture1.jpg", // third-side texture image
            "../images/texture1.jpg"  // fourth-side texture image
        ];
        polygonAttributes.drawInterior = true;
        polygonAttributes.drawOutline = false;
        polygonAttributes.outlineColor = WorldWind.Color.WHITE;
        polygonAttributes.interiorColor = WorldWind.Color.WHITE;
        polygonAttributes.drawVerticals = polygon.extrude;
        polygonAttributes.applyLighting = false;
        polygonAttributes.depthTest=false;
        polygon.attributes = polygonAttributes;
        // var highlightAttributes = new WorldWind.ShapeAttributes(polygonAttributes);
        // highlightAttributes.outlineColor = WorldWind.Color.WHITE;
        // polygon.highlightAttributes = highlightAttributes;

        roadlayer.addRenderable(polygon);
    };

    //加载适量图层回调函数
    var shapeConfigurationCallback = function (attributes, record) {
        // console.log(attributes);
        var height= record.attributes.values["height"];
        drawpolygon(record._parts[0],height);
        var configuration = {};
        configuration.name = attributes.values.name || attributes.values.Name || attributes.values.NAME;

        if (record.isPointType()) {
            configuration.name = attributes.values.name || attributes.values.Name || attributes.values.NAME;

            configuration.attributes = new WorldWind.PlacemarkAttributes(placemarkAttributes);

            if (attributes.values.pop_max) {
                var population = attributes.values.pop_max;
                configuration.attributes.imageScale = 0.01 * Math.log(population);
            }
        } else if (record.isPolygonType()) {
            configuration.attributes = new WorldWind.ShapeAttributes(null);

            // Fill the polygon with a random pastel color.
            configuration.attributes.interiorColor = new WorldWind.Color(
                0.375 + 0.5 * Math.random(),
                0.375 + 0.5 * Math.random(),
                0.375 + 0.5 * Math.random(),
                0.0);

            // Paint the outline in a darker variant of the interior color.
            configuration.attributes.outlineColor = new WorldWind.Color(
                0.5 * configuration.attributes.interiorColor.red,
                0.5 * configuration.attributes.interiorColor.green,
                0.5 * configuration.attributes.interiorColor.blue,
                0.0);
        }

        return configuration;
    };

   //添加矢量图层
    var worldLayer = new WorldWind.RenderableLayer("house1");
    worldLayer.enabled=false;
    var worldShapefile = new WorldWind.Shapefile( "./shapefile/house1.shp");
    worldShapefile.load(null, shapeConfigurationCallback, worldLayer);
    wwd.addLayer(worldLayer);
    wwd.navigator.tilt=75;
    wwd.goTo(new   WorldWind.Position(36.665,117.136, 2e3));


    /**
     * 添加树的三维模型
     */
    var modelLayer = new WorldWind.RenderableLayer("model");
    wwd.addLayer(modelLayer);

    var position = new WorldWind.Position(36.6627564, 117.1349503,0);
    var colladaLoader = new WorldWind.ColladaLoader(position);
    colladaLoader.init({dirPath: '../examples/collada_models/'});
    colladaLoader.load('1.dae', function (scene) {
        scene.scale = 0.1;
        scene.altitudeMode=WorldWind.RELATIVE_TO_GROUND;
        //scene.xRotation=-50;
        modelLayer.addRenderable(scene);
        //wwd.goTo(new WorldWind.Position(45, -100,10000));
    });

    //绘制道路
    var roadlayer = new WorldWind.RenderableLayer("road");
    roadlayer.displayName = "Polygons";
    roadlayer.maxActiveAltitude=9e3;
    wwd.addLayer(roadlayer);

    var boundary = [];
    boundary.push(new WorldWind.Location(36.66098942981116, 117.135543660008202));
    boundary.push(new WorldWind.Location(36.6610679, 117.1358425));
    boundary.push(new WorldWind.Location(36.66958, 117.129434));
    boundary.push(new WorldWind.Location(36.669475, 117.1292725));
    var attributes = new WorldWind.ShapeAttributes(null);
    attributes.outlineColor = WorldWind.Color.BLUE;
    attributes.interiorColor = new WorldWind.Color(0.251, 0.31, 0.3, 1);
    attributes.imageSource = "../images/400x230-splash-nww.png";
    attributes.outlineWidth=3;

    var surfacepolygon=new WorldWind.SurfacePolygon(boundary, attributes);
    roadlayer.addRenderable(surfacepolygon);

    //绘制地面红线
    boundary = [];
    boundary.push(new WorldWind.Location(36.66098942981116, 117.135533660008202));
    boundary.push(new WorldWind.Location(36.669475, 117.1292625));

    attributes =new WorldWind.ShapeAttributes(attributes);
    attributes.outlineColor = WorldWind.Color.RED;
    attributes.outlineWidth=5;

    var suferpolyline=new WorldWind.SurfacePolyline(boundary,attributes);
    roadlayer.addRenderable(suferpolyline);


    var pathPositions = [];
    pathPositions.push(new WorldWind.Position(36.66098942981116, 117.135533660008202, 24));
   // pathPositions.push(new WorldWind.Position(36.664475, 117.1322625, 12));
    pathPositions.push(new WorldWind.Position(36.669475, 117.1292625, 0));
    pathPositions.push(new WorldWind.Position(36.669475, 117.1202625, -1000));

    // Create the path.
    var path = new WorldWind.Path(pathPositions, null);
    path.altitudeMode = WorldWind.ABSOLUTE;//CLAMP_TO_GROUND;//
    path.followTerrain = true;
    path.extrude = false; // make it a curtain
    path.useSurfaceShapeFor2D = true; // use a surface shape in 2D mode

    // Create and assign the path's attributes.
    var pathAttributes = new WorldWind.ShapeAttributes(null);
    pathAttributes.outlineColor = WorldWind.Color.BLACK;
    pathAttributes.interiorColor = new WorldWind.Color(0, 1, 1, 0.5);
    pathAttributes.drawVerticals = path.extrude; // draw verticals only when extruding
    path.attributes = pathAttributes;
    roadlayer.addRenderable(path);
});