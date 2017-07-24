/*
 * Copyright (C) 2016 United States Government as represented by the Administrator of the
 * National Aeronautics and Space Administration. All Rights Reserved.
 */

requirejs([
        '../src/WorldWind',
        '../examples/LayerManager'
    ],
    function (ww,
              LayerManager) {
        "use strict";

        WorldWind.Logger.setLoggingLevel(WorldWind.Logger.LEVEL_WARNING);

        var wwd = new WorldWind.WorldWindow("canvasOne");

        var layers = [
            {layer: new WorldWind.CompassLayer(), enabled: true},
            {layer: new WorldWind.CoordinatesDisplayLayer(wwd), enabled: true},
            {layer: new WorldWind.ViewControlsLayer(wwd), enabled: true}
        ];

        for (var l = 0; l < layers.length; l++) {
            layers[l].layer.enabled = layers[l].enabled;
            wwd.addLayer(layers[l].layer);
        }
        //http://10.68.7.162:82/proxy.ashx?
        //http://47.92.110.235/proxy/proxy.jsp?
        //http://192.152.1.12:8080/proxy/proxy.jsp?
        //http://localhost/proxy/proxy.ashx
        var serviceAddress ="http://10.68.7.162:82/proxy.ashx?http://t0.tianditu.com/img_c/wmts?service=WMTS&request=GetCapabilities&VERSION=1.0.0";
        var layerIdentifier = "img";

        /**
         * 创建wmtm服务地图文档
         * @param xml
         */
        var createLayer = function (xml) {
            //当xml是字符串时，需解析为xml
            var xmlDom=$.parseXML(xml);
            // console.log(xmlDom);
            //创建wmtsCapabilities
            var wmtsCapabilities = new WorldWind.WmtsCapabilities(xmlDom);
            //创建wmtsLayerCapabilities
            var wmtsLayerCapabilities = wmtsCapabilities.getLayer(layerIdentifier);

            //创建图层配置信息，需设置参数，参数来自地图能力文档
            var wmtsConfig = WorldWind.WmtsLayer.formLayerConfiguration(wmtsLayerCapabilities,"default","c","tiles");

            //创建wmtsLayer
            var wmtsLayer = new WorldWind.WmtsLayer(wmtsConfig);
            wwd.addLayer(wmtsLayer);

            var gta=new WorldWind.GoToAnimator(wwd);
            gta.animationFrequency=10;
            gta.travelTime=4000;
            gta.goTo(new WorldWind.Position(39.899,116.409,10e6));
        }

        // Called if an error occurs during WMTS Capabilities document retrieval
        var logError = function (jqXhr, text, exception) {
            console.log("There was a failure retrieving the capabilities document: " + text + " exception: " + exception);
        };

        //异步加载地图服务能力文档
        $.get(serviceAddress).done(createLayer).fail(logError);
    });