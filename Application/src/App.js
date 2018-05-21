import THScene   from "./xepcore/Scene/Scene.js";
import Tethon   from "./xepcore/Core.js";
import THObject  from "./xepcore/Scene/Object.js";

let canvas = new THScene(document.getElementById("canvas"));
var Balls  = [],
    Colors = ["#2ecc71", "#f1c40f", "#1abc9c", "#9b59b6", "#e74c3c", "#d35400", "#1BBC9B", "#1F4788"];

canvas.width(window.innerWidth);
canvas.height(window.innerHeight);

for (var i = 0; i <= Math.round(window.innerHeight / 7); i++){
    let ball = new THObject("Shape");
    ball.radius(18);
    ball.x(canvas.getWidth() / 2 - 15);
    ball.y(canvas.getHeight() / 2 - 15);
    ball.CPS(8);
    ball.targetX(Math.random() * (canvas.getWidth() - 30));
    ball.targetY(Math.random() * (canvas.getHeight() - 30));
    ball.color(Colors[Math.round(Math.random() * Colors.length)]);
    Balls.push(ball);
}

class MyApp {
    static Main(){
        let ball = Balls[3];
        ball.color("black");
        for (var i = 0; i < Balls.length; i++) {
            canvas.addObject(Balls[i]);
        }
        ball.on("click", function () {
            for (var i = 0; i < Balls.length; i++) {
                Balls[i].targetX(ball.getX());
                Balls[i].targetY(ball.getY());
                Balls[i].CPS(10);
            }
        });
        canvas.update();
    }
}

Tethon.AppManager.Init(MyApp);