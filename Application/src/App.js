import THScene   from "./tethon/Scene/Scene.js";
import Tethon    from "./tethon/Core.js";
import THObject  from "./tethon/Scene/Object.js";
import Mouse from "./tethon/Scene/Events/Mouse.js";

let canvas = new THScene(document.getElementById("canvas"));
var Balls  = [],
    Colors = ["#2ecc71", "#f1c40f", "#1abc9c", "#9b59b6", "#e74c3c", "#d35400", "#1BBC9B", "#1F4788"];

canvas.backgroundImage("#444");
canvas.width(window.innerWidth);
canvas.height(window.innerHeight);

for (var i = 0; i <= Math.round(window.innerHeight / 15); i++){
    var ball = new THObject("Shape");
    ball.radius(10);
    ball.x(canvas.getWidth() / 2 - 15);
    ball.y(canvas.getHeight() / 2 - 15);
    ball.targetX(Math.random() * (canvas.getWidth() - 30));
    ball.targetY(Math.random() * (canvas.getHeight() - 30));
    ball.color(Colors[Math.round(Math.random() * Colors.length)]);
    Balls.push(ball);
    ball = null;
}

class MyApp {
    static Main(){
        let Ball = Balls[3];
        Ball.draggable(true);
        Ball.color("black");
        for (var i = 0; i < Balls.length; i++) {
            canvas.addObject(Balls[i]);
        }
        Ball.on("dragstart", function () {
            console.log("dragging..");
        });
        Ball.on("click", function () {
            Balls.forEach(function (element) {
                element.targetX(Ball.getX());
                element.targetY(Ball.getY());
            });
        });
        canvas.update();
    }
}

Tethon.AppManager.Init(MyApp);