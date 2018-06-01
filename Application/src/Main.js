import Tethon    from "./tethon/Core.js";
import THScene   from "./tethon/Scene/Scene.js";
import THObject  from "./tethon/Scene/Object.js";

let canvas = new THScene(document.getElementById("canvas"));
canvas.width(1000);
canvas.height(618);

var Player = new THObject("Image");
Player.src("../Tethon.js.code/images/Jungle Asset Pack/Character/stay/1.png");
Player.width(39);
Player.height(60);
Player.x(30);
Player.y(canvas.getHeight() - Player.getHeight() - 80);

var Backgrounds1 = [], bg1 = null;
for (var i = 1; i <= 5; i++){
    bg1 = new THObject("Image");
    bg1.src("../Tethon.js.code/images/Jungle Asset Pack/parallax background/plx-" + i + ".png");
    bg1.width(canvas.getWidth()  * 2);
    bg1.height(canvas.getHeight());
    Backgrounds1.push(bg1);
}
var Backgrounds2 = [], bg2 = null;
for (var i = 1; i <= 5; i++){
    bg2 = new THObject("Image");
    bg2.src("../Tethon.js.code/images/Jungle Asset Pack/parallax background/plx-" + i + ".png");
    bg2.width(canvas.getWidth()  * 2);
    bg2.height(canvas.getHeight());
    bg2.x(bg1.getX() + bg1.getWidth());
    Backgrounds2.push(bg2);
}

var Ground = new THObject("Image");
Ground.src("../Tethon.js.code/images/Jungle Asset Pack/parallax background/ground.png");
Ground.width(1000);
Ground.y(canvas.getHeight() - 90);
Ground.height(100);
var Ground2 = new THObject("Image");
Ground2.src("../Tethon.js.code/images/Jungle Asset Pack/parallax background/ground.png");
Ground2.width(1000);
Ground2.y(canvas.getHeight() - 90);
Ground2.x(Ground.getX() + Ground.getWidth());
Ground2.height(100);

class MyApp {
    static Main(){
        bg1, bg2 = null;
        Backgrounds1.forEach(function (element) {
            canvas.add(element);
        });
        Backgrounds2.forEach(function (element) {
            canvas.add(element);
        });
        canvas.add(Ground);
        canvas.add(Ground2);
        canvas.add(Player);
        Player.zIndex(THScene.objects().length);

        setInterval(function () {
            if(Ground.getX() + Ground.getWidth() < 0){
                Ground.x(Ground2.getX() + Ground2.getWidth());
            }
            if(Ground2.getX() + Ground2.getWidth() < 0){
                Ground2.x(Ground.getX() + Ground.getWidth());
            }
            if(!Player.hasAnimation())
                Player.addAnimation(["../Tethon.js.code/images/Jungle Asset Pack/Character/run/1.png", "../Tethon.js.code/images/Jungle Asset Pack/Character/run/2.png", "../Tethon.js.code/images/Jungle Asset Pack/Character/run/3.png", "../Tethon.js.code/images/Jungle Asset Pack/Character/run/4.png", "../Tethon.js.code/images/Jungle Asset Pack/Character/run/5.png", "../Tethon.js.code/images/Jungle Asset Pack/Character/run/6.png", "../Tethon.js.code/images/Jungle Asset Pack/Character/run/7.png", "../Tethon.js.code/images/Jungle Asset Pack/Character/run/8.png"], 100);
            Backgrounds1[1].targetX(Backgrounds1[1].getX() - 5);
            Backgrounds1[2].targetX(Backgrounds1[2].getX() - 10);
            Backgrounds1[3].targetX(Backgrounds1[3].getX() - 20);
            Backgrounds1[4].targetX(Backgrounds1[4].getX() - 30);

            Backgrounds2[1].targetX(Backgrounds2[1].getX() - 5);
            Backgrounds2[2].targetX(Backgrounds2[2].getX() - 10);
            Backgrounds2[3].targetX(Backgrounds2[3].getX() - 20);
            Backgrounds2[4].targetX(Backgrounds2[4].getX() - 30);
            Ground.targetX(Ground.getX() - 20);
            Ground2.targetX(Ground2.getX() - 20);
        },40);
        canvas.update();
    }
}

Tethon.AppManager.Init(MyApp);
