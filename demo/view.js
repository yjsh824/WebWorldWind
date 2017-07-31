/**
 * Created by yuanjs on 2017/7/27.
 */
requirejs(['../src/WorldWind',
    '../src/geom/Location'],function(ww,Location){
    "use strict";
    WorldWind.Logger.setLoggingLevel(WorldWind.Logger.LEVEL_WARNING);

    var wwd=new WorldWind.WorldWindow("canvasOne");

    var layers = [
        {layer: new WorldWind.TiandituLayer(),enabled: true},
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
        /**
         * 回到初始化
         */
        $("#btninit").click(function(){
            wwd.navigator.range=1e7;
            wwd.navigator.heading=0;
            wwd.navigator.tilt=0;
            wwd.navigator.lookAtLocation=new WorldWind.Location(0,0);
        });

        var roundGlobe= wwd.globe,flatGlobe=null;
        $("#cbx").change(function(){
            var projectionName=$("#cbx").val();

            if (projectionName === "3D") {
                if (!roundGlobe) {
                    roundGlobe = new WorldWind.Globe(new WorldWind.EarthElevationModel());
                }

                if (wwd.globe !== roundGlobe) {
                    wwd.globe = roundGlobe;
                }
            } else {
                if (!flatGlobe) {
                    flatGlobe = new WorldWind.Globe2D();
                }

                if (projectionName === "Equirectangular") {
                    flatGlobe.projection = new WorldWind.ProjectionEquirectangular();
                } else if (projectionName === "Mercator") {
                    flatGlobe.projection = new WorldWind.ProjectionMercator();
                } else if (projectionName === "North Polar") {
                    flatGlobe.projection = new WorldWind.ProjectionPolarEquidistant("North");
                } else if (projectionName === "South Polar") {
                    flatGlobe.projection = new WorldWind.ProjectionPolarEquidistant("South");
                } else if (projectionName === "North UPS") {
                    flatGlobe.projection = new WorldWind.ProjectionUPS("North");
                } else if (projectionName === "South UPS") {
                    flatGlobe.projection = new WorldWind.ProjectionUPS("South");
                }

                if (wwd.globe !== flatGlobe) {
                    wwd.globe = flatGlobe;
                }
            }

            wwd.redraw();

        });
    })
});