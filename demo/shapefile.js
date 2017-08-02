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
        // Specify a texture for the polygon and its four extruded sides.
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

        polygonsLayer.addRenderable(polygon);
    };
    var polygonsLayer = new WorldWind.RenderableLayer();
    polygonsLayer.displayName = "Polygons";
    wwd.addLayer(polygonsLayer);
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

   // var shapefileLibrary = "http://worldwindserver.net/webworldwind/data/shapefiles/naturalearth";

    // Create data for the world.
    var worldLayer = new WorldWind.RenderableLayer("house1");
    var worldShapefile = new WorldWind.Shapefile( "./shapefile/house1.shp");
    worldShapefile.load(null, shapeConfigurationCallback, worldLayer);
    wwd.addLayer(worldLayer);
    wwd.navigator.tilt=75;
    wwd.goTo(new   WorldWind.Position(36.665,117.136, 2e3));
    //
    // // Create data for cities.
    // var cityLayer = new WorldWind.RenderableLayer("Cities");
    // var cityShapefile = new WorldWind.Shapefile(shapefileLibrary + "/ne_50m_populated_places_simple/ne_50m_populated_places_simple.shp");
    // cityShapefile.load(null, shapeConfigurationCallback, cityLayer);
    // wwd.addLayer(cityLayer);
    //
    // var fortStory = "http://worldwindserver.net/webworldwind/data/shapefiles/misc/FortStory/Trident-Spectre-Indigo-i.shp";
    // var fortStoryLayer = new WorldWind.RenderableLayer("Fort Story");
    // var fortStoryShapefile = new WorldWind.Shapefile(fortStory);
    // fortStoryShapefile.load(null, null, fortStoryLayer);
    // wwd.addLayer(fortStoryLayer);
});