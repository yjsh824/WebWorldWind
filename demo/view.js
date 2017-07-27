/**
 * Created by yuanjs on 2017/7/27.
 */
requirejs(['../src/WorldWind',
    '../src/geom/Location'],function(ww,Location){
    "use strict";
    WorldWind.Logger.setLoggingLevel(WorldWind.Logger.LEVEL_WARNING);

    var wwd=new WorldWind.WorldWindow("canvasOne");

    var layers = [
        {layer: new WorldWind.BMNGLayer(),enabled: true},
        {layer: new WorldWind.CompassLayer(), enabled: true},
        {layer: new WorldWind.CoordinatesDisplayLayer(wwd), enabled: true},
        {layer: new WorldWind.ViewControlsLayer(wwd), enabled: true}
    ];

    for (var l = 0; l < layers.length; l++) {
        layers[l].layer.enabled = layers[l].enabled;
        wwd.addLayer(layers[l].layer);
    }

    $(function(){
        $("#btnZoomin").click(function(){
            wwd.navigator.range*=0.95;
        });
        $("#btnZoomout").click(function(){
            wwd.navigator.range*=1.05;
        });
        $("#btnlat").click(function(){
            Location.greatCircleLocation(wwd.navigator.lookAtLocation,270, 0.034,wwd.navigator.lookAtLocation);
            wwd.redraw();
        });
        $("#btnlon").click(function(){
            wwd.navigator.heading +=0.5;

        });
        $("#btntilt").click(function(){
            var tilt=wwd.navigator.tilt+4;
            tilt=Math.min(tilt,90);

            wwd.navigator.tilt=tilt;
        });
        var intv;
        $("#btnroll").click(function(){
            if(intv!=null)
                clearInterval(intv);
            intv=setInterval(function(){

                Location.greatCircleLocation(wwd.navigator.lookAtLocation,270, 0.01424,wwd.navigator.lookAtLocation);
                wwd.redraw();
            },1000/24)
        });
        $("#btnstop").click(function(){
            if(intv!=null) {
                clearInterval(intv);
                intv=null;
            }
        });
    })
});