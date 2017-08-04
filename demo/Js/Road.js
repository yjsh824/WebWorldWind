/**
 * Created by yuanjs on 2017/8/4.
 */
define([
    '../../src/WorldWind'
],function(ww){
    "use strict";
    var Road=function(wwd,layer){
        this.wwd=wwd;
        if(typeof(layer)=="undefined") {
            var roadlayer = new WorldWind.RenderableLayer("roadlayer");
            roadlayer.displayName = "roadlayer";
            roadlayer.maxActiveAltitude = 9e3;
            this.roadlayer = roadlayer;
            this.wwd.addLayer(this.roadlayer);
        }
        else
        {
            this.roadlayer=layer;
        }
    };

    Object.defineProperties(Road.prototype,{
        Layer:{
            get:function(){
                return this.roadlayer;
            }
        }
    });

    Road.prototype.drawRoad=function(boundary)
    {
        var attributes = new WorldWind.ShapeAttributes(null);
        attributes.outlineColor = WorldWind.Color.BLUE;
        attributes.interiorColor = new WorldWind.Color(0.251, 0.31, 0.3, 1);
        //attributes.imageSource = "../images/400x230-splash-nww.png";
        attributes.outlineWidth=3;

        var surfacepolygon=new WorldWind.SurfacePolygon(boundary, attributes);
        this.roadlayer.addRenderable(surfacepolygon);
    };
        return Road;
});