/**
 * Created by yuanjs on 2017/8/4.
 */
define([
    '../../src/WorldWind','../Js/BaseRenderable'
],function(ww,BaseRenderable){
    "use strict";
    var Building=function(wwd,layer)
    {
        this.wwd=wwd;
        if(typeof(layer)=="undefined") {
            BaseRenderable.call(this,wwd,"buildlayer");
        }else{
            this.layer=layer;
        }
    };
    Building.prototype=Object.create(BaseRenderable.prototype);

    Building.prototype.build=function(pts,height){
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


        this.layer.addRenderable(polygon);
    };

    //加载适量图层回调函数
    Building.prototype.shapeConfigurationCallback = function (attributes, record) {

        var height= record.attributes.values[this.parent.height];

        this.parent.build(record._parts[0],height);
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

    Building.prototype.loadShp=function(shpfile,height){
        var worldShapefile = new WorldWind.Shapefile( shpfile);
        worldShapefile.parent=this;
        this.height=height;
        worldShapefile.load(null, this.shapeConfigurationCallback, this.layer);
        //this.wwd.addLayer(worldLayer);

    };
    return Building;

});