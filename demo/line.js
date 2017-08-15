/**
 * Created by yuanjs on 2017/8/14.
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

    // Create the path's positions.
    var pathPositions = [];
    pathPositions.push(new WorldWind.Position(36.66098942981116, 117.135543660008202, 10));
    pathPositions.push(new WorldWind.Position(36.6610679, 117.1358425, 10));
    pathPositions.push(new WorldWind.Position(36.66958, 117.129434, 19));
    pathPositions.push(new WorldWind.Position(36.669475, 117.1292725, 21));
    pathPositions.push(new WorldWind.Position(36.66098942981116, 117.135543660008202, 10));

    // Create the path.
    var path = new WorldWind.Path(pathPositions, null);
    path.altitudeMode = WorldWind.RELATIVE_TO_GROUND;
    path.followTerrain = true;
    path.pathType=WorldWind.RHUMB_LINE;
    path.extrude = false; // make it a curtain
    path.useSurfaceShapeFor2D = true; // use a surface shape in 2D mode
    

    // Create and assign the path's attributes.
    var pathAttributes = new WorldWind.ShapeAttributes(null);
    pathAttributes.outlineColor = WorldWind.Color.RED;
    pathAttributes.interiorColor = new WorldWind.Color(0, 1, 1, 0.5);
    pathAttributes.drawVerticals = path.extrude; // draw verticals only when extruding
    pathAttributes.outlineWidth=12;
    path.attributes = pathAttributes;

    // Create and assign the path's highlight attributes.
    var highlightAttributes = new WorldWind.ShapeAttributes(pathAttributes);
    highlightAttributes.outlineColor = WorldWind.Color.BLUE;
    highlightAttributes.interiorColor = new WorldWind.Color(1, 1, 1, 0.5);
    path.highlightAttributes = highlightAttributes;

    // Add the path to a layer and the layer to the World Window's layer list.
    var pathsLayer = new WorldWind.RenderableLayer();
    pathsLayer.displayName = "Paths";
    pathsLayer.addRenderable(path);
    wwd.addLayer(pathsLayer);
    var highlightController = new WorldWind.HighlightController(wwd);

    wwd.goTo(new WorldWind.Position(36.665,117.136, 1e4));
});