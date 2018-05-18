
import XCScene   from "./xepcore/Scene/Scene.js";
import XepCore   from "./xepcore/Core.js";
import XCObject  from "./xepcore/Scene/Object.js";

let canvas = new XCScene(document.getElementById("canvas")),
    Circle = new XCObject("Shape");

canvas.width(window.innerWidth);
canvas.height(window.innerHeight);

Circle.type("circle");
Circle.radius(30);
Circle.x(canvas.getWidth()/2 - Circle.getRadius()/2);
Circle.y(canvas.getHeight()/2 - Circle.getRadius()/2);
Circle.color("#FC6A8BFF");
Circle.CPS(5);

class MyApp {
    static Main(){
        canvas.addObject(Circle);
        canvas.update();
        window.onkeydown = function(event){
            if(event.keyCode == 39){
                Circle.targetX(Circle.getX() + 15);
            } else if(event.keyCode == 37){
                Circle.targetX(Circle.getX() - 15);
            } else if(event.keyCode == 38){
                Circle.targetY(Circle.getY() - 15);
            } else if(event.keyCode == 40){
                Circle.targetY(Circle.getY() + 15);
            } 
            Circle.targetRotate(Math.random()*360);
        }
        window.ontouchmove = function(event){
            Circle.x(event.changedTouches[0].clientX);
            Circle.y(event.changedTouches[0].clientY);
        }
    }
}

XepCore.AppManager.Init(MyApp);
