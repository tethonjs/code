import Tethon    from "./tethon/Core.js";
import THScene   from "./tethon/Scene/Scene.js";
import THObject  from "./tethon/Scene/Object.js";

let canvas = new THScene(document.getElementById("canvas"));
canvas.width(window.innerWidth);
canvas.height(window.innerHeight);

var url = "Tethon.js.code/";
if(window.location.protocol == "https:"){
    url = "";
}

for(var w = 0; w < canvas.getWidth() + 147; w += 147){
    for(var h = 0; h < canvas.getHeight() + 147; h += 147){
        let w1 = new THObject("Image");
        w1.src("../" + url + "images/bg.png");
        w1.width(147);
        w1.height(147);
        w1.x(w);
        w1.y(h);
        canvas.add(w1);
        w1 = null;
    }
}
var Sizes = [{w:70,h:90},{w:140,h:180},{w:35,h:45}],
GameMenu = {
    Title: new THObject("Image"),
    Buttons: [
        new THObject("Image"),
        new THObject("Image"),
        new THObject("Image"),
        new THObject("Image")
    ],
    y: [50, 300, 320, 325, 15]
},
Monster = new THObject("Image"),
Game = {
    isPlaying: false,
    isDead: false
},
HealthBar = new THObject("Image"),
BC = new THObject("Image"),
BT = new THObject("Text"),
HT = new THObject("Text"),
YD = new THObject("Image"),
Player = new THObject("Image"),
Pistol = new THObject("Image"),
Bullets = {
    maxCount: Math.round(Math.random() * 65) + 30,
    objects: []
},
PlayerHP = 300;
for (var i = 0; i <= Bullets.maxCount; i++){
    let b = new THObject("Image");
    b.src("../" + url + "images/bullet.png");
    b.width(10);
    b.height(5);
    b.x(0);
    b.y(canvas.getHeight() - 76);
    b.CPS(35);
    b.on("collision", function () {
        if(this.detectedObject.getSrc().search("monster") !== -1){
            this.detectedObject.remove();
            Bullets.objects.pop();
            this.object.remove();
            //когда пуля попала в лоб))
        }
    });
    Bullets.objects.push(b);
    b = null;
}

class MyApp {
    static Main(){
        Player.src("../" + url + "images/player1.png");
        Player.width(56);
        Player.height(140);
        Player.x(40);
        Player.y(canvas.getHeight() - 140);
        Player.filter("opacity", 0);
        Player.CPS(3);

        HealthBar.src("../" + url + "images/hpc.png");
        HealthBar.width(160);
        HealthBar.height(60);
        HealthBar.x(canvas.getWidth() - 190);
        HealthBar.y(20);
        HealthBar.filter("opacity", 0);

        BC.src("../" + url + "images/bc.png");
        BC.width(160);
        BC.height(60);
        BC.x(canvas.getWidth() - 190);
        BC.y(110);
        BC.filter("opacity", 0);

        BT.text(Bullets.objects.length);
        BT.font("30px 'Comic Sans MS'");
        BT.color("#153723");
        BT.x(canvas.getWidth() - 80);
        BT.y(156);
        BT.filter("opacity", 0);

        HT.text(PlayerHP);
        HT.font("30px 'Comic Sans MS'");
        HT.color("#153723");
        HT.x(canvas.getWidth() - 95);
        HT.y(70);
        HT.filter("opacity", 0);

        Pistol.src("../" + url + "images/pistol.png");
        Pistol.width(36);
        Pistol.height(18);
        Pistol.x(90);
        Pistol.y(canvas.getHeight() - 80);
        Pistol.filter("opacity", 0);
        Pistol.scale(5);

        YD.src("../" + url + "images/yd.png");
        YD.width(600 * 1.5);
        YD.height(248 * 1.8);
        YD.filter("opacity", 0);
        YD.x((canvas.getWidth() - YD.getWidth()) / 2);
        YD.y(100);

        GameMenu.Title.src("../" + url + "images/title.png");
        GameMenu.Title.width(400);
        GameMenu.Title.height(200);
        GameMenu.Title.x(canvas.getWidth() / 2 - 200);
        GameMenu.Title.y(50);

        GameMenu.Buttons[0].src("../" + url + "images/play.png");
        GameMenu.Buttons[0].width(115);
        GameMenu.Buttons[0].height(75);
        GameMenu.Buttons[0].x(canvas.getWidth() / 2 - 57.5);
        GameMenu.Buttons[0].y(300);

        GameMenu.Buttons[1].src("../" + url + "images/about.png");
        GameMenu.Buttons[1].width(90);
        GameMenu.Buttons[1].height(50);
        GameMenu.Buttons[1].x(canvas.getWidth() / 2 - (57.5 * 2.5));
        GameMenu.Buttons[1].y(320);

        GameMenu.Buttons[2].src("../" + url + "images/contact.png");
        GameMenu.Buttons[2].width(90);
        GameMenu.Buttons[2].height(50);
        GameMenu.Buttons[2].x(canvas.getWidth() / 2 + (57.5));
        GameMenu.Buttons[2].y(325);

        GameMenu.Buttons[3].src("../" + url + "images/btt.png");
        GameMenu.Buttons[3].width(110);
        GameMenu.Buttons[3].height(60);
        GameMenu.Buttons[3].x(30);
        GameMenu.Buttons[3].y(-85);
        GameMenu.Buttons[3].CPS(9);

        Monster.src("../" + url + "images/monster.png");
        Monster.width(70);
        Monster.height(90);
        Monster.x(Math.random() * canvas.getWidth());
        Monster.y(canvas.getHeight() - 95);
        Monster.CPS(0.5);

        canvas.add(GameMenu.Title);
        canvas.add(GameMenu.Buttons[0]);
        canvas.add(GameMenu.Buttons[1]);
        canvas.add(GameMenu.Buttons[2]);
        canvas.add(GameMenu.Buttons[3]);
        canvas.add(HealthBar);
        canvas.add(BC);
        canvas.add(BT);
        canvas.add(HT);
        canvas.add(Player);
        canvas.add(Pistol);
        canvas.add(YD);

        GameMenu.Buttons[0].on("click", function () {
            if(!Game.isPlaying || Game.isDead){
                let objects = [GameMenu.Title, GameMenu.Buttons[0], GameMenu.Buttons[1], GameMenu.Buttons[2]];
                objects.forEach(function (element) {
                    element.targetY(-canvas.getHeight());
                    element.CPS(9);
                });
                setTimeout(function () {
                    Game.isPlaying = true;
                    GameMenu.Buttons[3].targetY(15);
                    Player.filter("opacity", 1);
                    Pistol.filter("opacity", 1);
                    HealthBar.filter("opacity", 1);
                    BC.filter("opacity", 1);
                    HT.filter("opacity", 1);
                    BT.filter("opacity", 1);
                    setTimeout(function () {
                        canvas.add(Monster);
                    }, 4000);
                },100);
            }
        });
        GameMenu.Buttons[3].on("click", function () {
            if(Game.isPlaying || Game.isDead){
                Game.isPlaying = false;
                GameMenu.Title.targetY(GameMenu.y[0]);
                GameMenu.Buttons[0].targetY(GameMenu.y[1]);
                GameMenu.Buttons[1].targetY(GameMenu.y[2]);
                GameMenu.Buttons[2].targetY(GameMenu.y[3]);
                GameMenu.Buttons[3].targetY(-85);
                Player.filter("opacity", 0);
                Pistol.filter("opacity", 0);
                YD.filter("opacity", 0);
                HealthBar.filter("opacity", 0);
                BC.filter("opacity", 0);
                HT.filter("opacity", 0);
                BT.filter("opacity", 0);
            }
        });
        window.onkeydown = function(event){
            if(Game.isPlaying){
                const k = event.keyCode;
                var speed = 12;
                Player.addAnimation(["../" + url + "images/player1.png", "../" + url + "images/player2.png", "../" + url + "images/player3.png"], speed * 4.5);
                if(k === 68){
                    //right
                    Player.flip(false);
                    Player.targetX(Player.getX() + speed + Player.getCPS());
                    Pistol.x(Player.getX() + 60);
                    Pistol.flip(false);
                }
                if(k === 65){
                    //left
                    Player.flip(true);
                    Player.targetX(Player.getX() - speed - Player.getCPS());
                    Pistol.x(Player.getX() - 45);
                    Pistol.flip(true);
                }
                if(k === 32){
                    //space
                    if(Bullets.objects.length > 0){
                        let lastB = Bullets.objects.pop();
                        if(Pistol.isFlipped())
                            lastB.x(Player.getX() - 15);
                        else
                            lastB.x(Player.getX() + 43);
                        if(Player.isFlipped()){
                            lastB.flip(true);
                            lastB.targetX(-10);
                        } else {
                            lastB.flip(false);
                            lastB.targetX(canvas.getWidth() + 30);
                        }
                        canvas.add(lastB);
                        BT.text(Bullets.objects.length);
                    }
                }
            }
        };
        window.onkeyup = function(){
            Player.cancelAnimation();
        };
        Player.on("move", function () {
            if(Player.getX() > canvas.getWidth() + 5){
                Player.x(-5);
            }
            if(Player.getX() < -10){
                Player.x(canvas.getWidth() - 5);
            }
            Monster.targetX(Player.getX());
        });
        Player.on("collision", function () {
            let i = this.detectedObject.getSrc();
            if(i.search("monster") !== -1){
                if(PlayerHP > 0){
                    PlayerHP--;
                    HT.text(PlayerHP);
                } else {
                    let l = [Player, Monster, Pistol];
                    l.forEach(function (element) {
                        element.filter("opacity", 0);
                    });
                    YD.filter("opacity", 1);
                    Game.isDead = true;
                }
            }
        });
        canvas.update();
    }
}
window.onresize = function(){canvas.width(window.innerWidth);canvas.height(window.innerHeight)};
Tethon.AppManager.Init(MyApp);