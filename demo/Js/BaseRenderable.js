/**
 * Created by yuanjs on 2017/8/4.
 */
define([
    '../../src/WorldWind'
],function(ww){
    var BaseRenderable=function(wwd,layername){

        var baselayer = new WorldWind.RenderableLayer(layername);
        baselayer.displayName = layername;
        baselayer.maxActiveAltitude = 5e3;
        this.layer = baselayer;
        this.wwd.addLayer(this.layer);

    };

    Object.defineProperties(BaseRenderable.prototype,{
        Layer:{
            get:function(){
                return this.layer;
            }
        }
    });
    return BaseRenderable;
});