/**
 * Created by yuanjs on steplength17/8/4.
 */
define([
    '../../src/WorldWind','../Js/BaseRenderable'
],function(ww,BaseRenderable){
    var Car=function(wwd,layer){
        this.wwd=wwd;
        if(typeof(layer)=="undefined") {
            BaseRenderable.call(this,wwd,"carlayer");
        }else{
            this.layer=layer;
        }
    };

    Car.prototype=Object.create(this,BaseRenderable.prototype);

    var steplength=200;
    /**
     * 根据两点解析直线,
     * 计算斜率及steplength个间隔点
     * @param start
     * @param end
     */
    function parseline(start,end){
        var x0=start.longitude,y0=start.latitude,
            x1=end.longitude,y1=end.latitude,
            dx=x1-x0,dy=y1-y0;

        var pts=[];
        if(x0!=x1) {
            var k = dy / dx;
            var b = (x0 * y1 - x1 * y0) / (x0 - x1);
            var step = dx / steplength;
            for (var i = 0; i < steplength; i++) {
                var x = x0 + step * i;
                pts.push(new WorldWind.Position((k * x + b), x, 0));
            }
        }
        else
        {
            var step=dy/steplength;
            for (var i = 0; i < steplength; i++) {
                var x = x0;
                pts.push(new WorldWind.Position(y0+step, x, 0));
            }
        }

        var t= Math.atan(k)*180/Math.PI;

        var d=7;
        if(dx==0)
            t=180-d;
        else if(dx>0)
            t=90+t-d;
        else if (dx<0)
            t=270+t-d;

        return {pts:pts,t:t};

    }

    Car.prototype.drawCar=function(start,end){
        var r=parseline(start,end);
        var pts=r.pts;
        //var position = new WorldWind.Position(36.6627564, 117.1349503,0);
        var colladaLoader = new WorldWind.ColladaLoader(pts[0]);
        var tlayer=this.layer;
        colladaLoader.init({dirPath: '../examples/collada_models/car/'});
        colladaLoader.load('dae.dae', function (scene) {
            scene.scale = 0.01;
            scene.altitudeMode=WorldWind.RELATIVE_TO_GROUND;
            scene.xRotation=90;

            scene.yRotation=r.t;
            var tree=scene;
            tlayer.addRenderable(tree);
            var i=0;
            var t=setInterval(function(){
                i++;
                if(i==steplength) {
                    // clearInterval(t);
                    // return;
                    i=0;
                }
             
                tree.position=pts[i];
                //console.log(tree);
                // modelLayer.removeRenderable(tree);
            },42);
            //wwd.goTo(new WorldWind.Position(45, -100,10000));
        });

    }

    return Car;
});