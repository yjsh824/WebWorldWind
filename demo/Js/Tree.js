/**
 * Created by yuanjs on 2017/8/4.
 */
define([
    '../../src/WorldWind','../Js/BaseRenderable'
],function(ww,BaseRenderable){
    "use strict";
    var Tree=function(wwd,layer)
    {
        this.wwd=wwd;
        if(typeof(layer)=="undefined") {
            BaseRenderable.call(this,wwd,"treelayer");
        }else{
            this.layer=layer;
        }
    };
    Tree.prototype=Object.create(BaseRenderable.prototype);

    Tree.prototype.drawTree=function(pts){
        var  image = WorldWind.configuration.baseUrl + "images/tree.png",
            placemarkAttributes = new WorldWind.PlacemarkAttributes(null);

        placemarkAttributes.imageScale = 0.1;
        //如果为null时，图像左下角对齐位置点，为0.5,0.5时，则图像中点对齐位置
        placemarkAttributes.imageOffset = new WorldWind.Offset(
            WorldWind.OFFSET_FRACTION, 0.535367545,
            WorldWind.OFFSET_FRACTION, 0.0);
        placemarkAttributes.imageColor = WorldWind.Color.WHITE;
        placemarkAttributes.imageSource = image;

        for(var i in pts) {
            var placemark = new WorldWind.Placemark(pts[i], true, null);

            placemark.altitudeMode = WorldWind.CLAMP_TO_GROUND;
            placemark.eyeDistanceScaling = true;
            placemark.eyeDistanceScalingThreshold = 150;
            placemark.attributes = placemarkAttributes;
            this.layer.addRenderable(placemark);
        }
    };

    return Tree;
});