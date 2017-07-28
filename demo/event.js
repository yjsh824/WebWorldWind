/*
 * Copyright (C) 2016 United States Government as represented by the Administrator of the
 * National Aeronautics and Space Administration. All Rights Reserved.
 */

requirejs([
        '../src/WorldWind'
    ],
    function (ww) {
        "use strict";

        WorldWind.Logger.setLoggingLevel(WorldWind.Logger.LEVEL_WARNING);

        var wwd = new WorldWind.WorldWindow("canvasOne");

        var layers = [
            {layer: new WorldWind.BMNGLayer(), enabled: true},
            {layer: new WorldWind.CompassLayer(), enabled: true},
            {layer: new WorldWind.CoordinatesDisplayLayer(wwd), enabled: true},
            {layer: new WorldWind.ViewControlsLayer(wwd), enabled: true}
        ];

        for (var l = 0; l < layers.length; l++) {
            layers[l].layer.enabled = layers[l].enabled;
            wwd.addLayer(layers[l].layer);
        }
        var handlePick=function(o){
            var x = o.clientX,
                y = o.clientY;

            var pickList = wwd.pick(wwd.canvasCoordinates(x, y));

            if (pickList.objects.length > 0) {
                for (var p = 0; p < pickList.objects.length; p++) {


                    if(pickList.objects[p].userObject instanceof  WorldWind.Compass)
                    {
                        // var compass=pickList.objects[p].userObject;
                        // console.log(compass);
                        wwd.navigator.range=1e7;//设置eye距离
                        wwd.navigator.heading=0;//正北方向
                        wwd.navigator.tilt=0;
                        wwd.navigator.lookAtLocation=new WorldWind.Location(0,wwd.navigator.lookAtLocation.longitude );
                        //console.log(wwd.navigator.lookAtLocation );

                    }

                }
            }

        };
        wwd.addEventListener("dblclick", handlePick);

    });