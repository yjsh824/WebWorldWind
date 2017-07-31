/**
 * Created by yuanjs on 2017/7/28.
 */
define(["../layer/WmtsLayer","../ogc/wmts/WmtsCapabilities"],function(WmtsLayer,WmtsCapabilities){
    "use strict";
    var TiandituLayer=function(serviceAddress,layerIdentifier){
        var pserviceAddress ="http://47.92.110.235/proxy/proxy.jsp?http://t0.tianditu.com/img_c/wmts?service=WMTS&request=GetCapabilities&VERSION=1.0.0";
        var playerIdentifier = "img";

        serviceAddress=typeof(serviceAddress)=="undefined"?pserviceAddress:serviceAddress;
        layerIdentifier=typeof(layerIdentifier)=="undefined"?playerIdentifier:layerIdentifier;


        var xmlDom;
        $.ajax({
            url:serviceAddress,
            success:function(xmld){
                xmlDom=xmld;
            },
            error: function (jqXhr, text, exception) {
                console.log("There was a failure retrieving the capabilities document: " + text + " exception: " + exception);
            },
            dataType:"xml",
            cache:true,
            async:false,
            type:'get'
        });
        var wmtsCapabilities = new WmtsCapabilities(xmlDom);
        //创建wmtsLayerCapabilities
        var wmtsLayerCapabilities = wmtsCapabilities.getLayer(layerIdentifier);

        //创建图层配置信息，需设置参数，参数来自地图能力文档
        var wmtsConfig = WorldWind.WmtsLayer.formLayerConfiguration(wmtsLayerCapabilities,"default","c","tiles");

        WmtsLayer.call(this,wmtsConfig);

    };

    TiandituLayer.prototype=Object.create(WmtsLayer.prototype);

    return TiandituLayer;
});