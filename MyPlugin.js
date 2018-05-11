
import XCScene   from "./xepcore/Scene/Scene.js";
import XepCore   from "./xepcore/Core.js";
import XCObject  from "./xepcore/Scene/Object.js";

let canvas = new XCScene(document.getElementById("canvas")),
    Mario  = new XCObject("Image"),
    Wall   = new XCObject("Shape"),
    Wall1   = new XCObject("Shape");

canvas.width(window.innerWidth);
canvas.height(window.innerHeight);

Mario.src("../images/mario/player/1.png");
Mario.width(35);
Mario.height(50);
Mario.x(0);
Mario.y(window.innerHeight-Mario.getHeight());

Wall.type("square");
Wall.width(10);
Wall.height(60);
Wall.x(400);
Wall.y(window.innerHeight-Wall.getHeight());

Wall1.type("square");
Wall1.width(10);
Wall1.height(60);
Wall1.x(300);
Wall1.y(window.innerHeight-Wall.getHeight());

class MyApp {
    static Main(){
        window.onkeydown = function (event) {
            if(event.key == "a" || event.key == "d")
                Mario.addAnimation(["../images/mario/player/1.png", "../images/mario/player/2.png", "../images/mario/player/3.png"], 100);
            else
                event.preventDefault();
            if(event.key == "a") {
                Mario.targetX(Mario.getX() - 10);
                Mario.flip(true);
                if(event.ctrlKey) Mario.CPS(3);
            }
            if(event.key == "d") {
                Mario.targetX(Mario.getX() + 10);
                Mario.flip(false);
                if(event.ctrlKey) Mario.CPS(3);
            }
        };
        Mario.on("objectmove", function () {
            if(Mario.getX() > canvas.getWidth()+10)
                Mario.x(-20);
            else if(Mario.getX() < -25)
                Mario.x(canvas.getWidth()-10);
        });
        Mario.on("objectcollision", function () {
            console.log("collision detected");
        });
        Mario.on("objectclick", function () {
            console.log("click detected");
        });
        window.onkeyup = function (event) {
            Mario.cancelAnimation();
            Mario.CPS(1);
            event.preventDefault();
        };
        canvas.addObject(Mario);
        canvas.addObject(Wall);
        canvas.addObject(Wall1);
        canvas.update();
    }
}

XepCore.AppManager.Init(MyApp, 1);
