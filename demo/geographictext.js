/**
 * Created by yuanjs on 2017/8/2.
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

    var peaks=[{
        longitude:117.02   ,
        latitude:36.68,
        elevation:1000,
        label:"这里是济南\n美丽的泉城"
    },{
        longitude:116.37   ,
        latitude:39.91,
        elevation:1000,
        label:"这里是北京\n中国的首都"
    }];

    var text,
        textAttributes = new WorldWind.TextAttributes(null),
        textLayer = new WorldWind.RenderableLayer("GraphicText");

    // Set up the common text attributes.
    textAttributes.color = WorldWind.Color.CYAN;

    // Set the depth test property such that the terrain does not obscure the text.
    textAttributes.depthTest = false;

    // For each peak, create a text shape.
    for (var i = 0, len = peaks.length; i < len; i++) {
        var peak = peaks[i],
            peakPosition = new WorldWind.Position(peak.latitude, peak.longitude, peak.elevation);

        text = new WorldWind.GeographicText(peakPosition, peak.label);

        // Set the text attributes for this shape.
        text.attributes = textAttributes;

        // Add the text to the layer.
        textLayer.addRenderable(text);
    }

    // Add the text layer to the World Window's layer list.
    wwd.addLayer(textLayer);
    wwd.goTo(new   WorldWind.Position(36.665,117.136, 2e6));

});