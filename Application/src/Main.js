'use strict'

import Tethon    from "./tethon/Core.js";
import THScene   from "./tethon/Scene/Scene.js";
import THObject  from "./tethon/Scene/Object.js";

let canvas = new THScene(document.getElementById("canvas"));
var Balls  = [],
    Colors = ["#2ecc71", "#f1c40f", "#1abc9c", "#9b59b6", "#e74c3c", "#d35400", "#1BBC9B", "#1F4788"];

canvas.width(window.innerWidth);
canvas.height(window.innerHeight);
canvas.background("https://tethonjs.com/images/mstile-310x310.png");

for (var i = 0; i <= Math.round(window.innerHeight / 15); i++){
    var ball = new THObject("Shape");
    ball.radius(10);
    ball.x(canvas.getWidth() / 2 - 15);
    ball.y(canvas.getHeight() / 2 - 15);
    ball.targetX(Math.random() * (canvas.getWidth() - 30));
    ball.targetY(Math.random() * (canvas.getHeight() - 30));
    ball.color(Colors[Math.round(Math.random() * Colors.length)]);
    Balls.push(ball);
    ball = undefined;
}

class MyApp {
    static Main(){
        let Ball = Balls[3];
        Ball.draggable(true);
        Ball.color("black");
        Ball.radius(17);
        for (var i = 0; i < Balls.length; i++) {
            canvas.add(Balls[i]);
        }
        Ball.on("dragstart", function () {
            console.log("dragging..");
        });
        Ball.on("collision", function () {
            if(this.detectedObject.getType() !== "Image"){
                Ball.zIndex(63);
                this.detectedObject.color(Colors[Math.round(Math.random() * Colors.length)]);
            }
        });
        canvas.update();
    }
}

Tethon.AppManager.Init(MyApp);