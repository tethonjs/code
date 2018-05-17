
import XCScene   from "./xepcore/Scene/Scene.js";
import XepCore   from "./xepcore/Core.js";
import XCObject  from "./xepcore/Scene/Object.js";
import UIMenu    from "./UIMenu.js";

let canvas = new XCScene(document.getElementById("canvas")),
    Square = new XCObject("Shape"),
    Circle = new XCObject("Shape"),
    Image  = new XCObject("Image");

canvas.width(window.innerWidth);
canvas.height(window.innerHeight);

Circle.type("circle");
Circle.radius(30);
Circle.x(canvas.getWidth()/2 - Circle.getRadius()/2);
Circle.y(canvas.getHeight()/2 - Circle.getRadius()/2);
Circle.color("#FC6A8BFF");

Image.width(80);
Image.height(180);
Image.src()

Square.type("square");
Square.width(30);
Square.height(30);
Square.x(canvas.getWidth()/2 - Square.getWidth()/2);
Square.y(canvas.getHeight()/2 - Square.getHeight()/2);
Square.CPS(5);

class MyApp {
    static Main(){
        UIMenu.Main();
        canvas.addObject(Square);
        canvas.addObject(Circle);
        canvas.update();
        window.onkeydown = function(event){
            if(event.keyCode == 39){
                Square.targetX(Square.getX() + 15);
            } else if(event.keyCode == 37){
                Square.targetX(Square.getX() - 15);
            } else if(event.keyCode == 38){
                Square.targetY(Square.getY() - 15);
            } else if(event.keyCode == 40){
                Square.targetY(Square.getY() + 15);
            } 
            Square.targetRotate(Math.random()*360);
        }
        window.ontouchmove = function(event){
            Square.targetX(event.changedTouches[0].clientX);
            Square.targetY(event.changedTouches[0].clientY);
            Square.targetRotate(Math.random()*360);
        }
    }
}

XepCore.AppManager.Init(MyApp);
