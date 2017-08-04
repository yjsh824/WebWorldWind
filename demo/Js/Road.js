/**
 * Created by yuanjs on 2017/8/4.
 */
define([
    '../../src/WorldWind','../Js/BaseRenderable'
],function(ww,BaseRenderable){
    "use strict";
    var Road=function(wwd,layer){
        this.wwd=wwd;
        if(typeof(layer)=="undefined") {
            BaseRenderable.call(this,wwd,"roadlayer");
        }
        else
        {
            this.layer=layer;
        }
    };

    Road.prototype=Object.create(BaseRenderable.prototype);

    Road.prototype.drawRoad=function(boundary)
    {
        var attributes = new WorldWind.ShapeAttributes(null);
        attributes.outlineColor = WorldWind.Color.BLUE;
        attributes.interiorColor = new WorldWind.Color(0.251, 0.31, 0.3, 1);
        //attributes.imageSource = "../images/400x230-splash-nww.png";
        attributes.outlineWidth=3;

        var surfacepolygon=new WorldWind.SurfacePolygon(boundary, attributes);
        this.layer.addRenderable(surfacepolygon);
    };
        return Road;
});