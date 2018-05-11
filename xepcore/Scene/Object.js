var EventHandlers = [],
    Animations = [];

import Logger from "../Logger/Logger.js";

export default class XCObject {
    constructor(XCType){
        this.XCType = XCType;
        if(XCType.toString() == "Image") {
            this.Properties = {
                src: "null",
                width: 0,
                height: 0,
                twidth: 0,
                wheight: 0,
                x: 0,
                y: 0,
                cps: 1,
                animation: "none",
                flipped: false
            };
        }
        if(XCType.toString() == "Shape"){
            this.Properties = {
                type: "circle",
                color: "#444",
                radius: 10,
                tradius: 10,
                width: 0,
                height: 0,
                twidth: 0,
                wheight: 0,
                x: 0,
                y: 0,
                tx: 0,
                ty: 0,
                cps: 1,
                animation: "none",
                flipped: false
            }
        }
    }
    static get(){return EventHandlers;}
}
Object.prototype.src = function (prop) {
     if(this.XCType.toString() == "Image") {
         this.Properties.src = prop;
     } else {
         Logger.error(7);
     }
 };
Object.prototype.width = function (prop) {
    if(this.XCType.toString() == "Image" || this.XCType.toString() == "Shape") {
        this.Properties.width = prop;
    } else {
        Logger.error(7);
    }
};
Object.prototype.height = function (prop) {
    if(this.XCType.toString() == "Image" || this.XCType.toString() == "Shape") {
        this.Properties.height = prop;
    } else {
        Logger.error(7);
    }
};
Object.prototype.targetWidth = function (prop) {
    if(this.XCType.toString() == "Image" || this.XCType.toString() == "Shape") {
        this.Properties.twidth = prop;
    } else {
        Logger.error(7);
    }
};
Object.prototype.targetHeight = function (prop) {
    if(this.XCType.toString() == "Image" || this.XCType.toString() == "Shape") {
        this.Properties.theight = prop;
    } else {
        Logger.error(7);
    }
};
Object.prototype.color = function (prop) {
    if(this.XCType.toString() == "Shape") {
        this.Properties.color = prop;
    } else {
        Logger.error(7);
    }
};
Object.prototype.radius = function (prop) {
    if(this.XCType.toString() == "Shape") {
        this.Properties.tradius = prop;
    } else {
        Logger.error(7);
    }
};
Object.prototype.CPS = function(prop){
    this.Properties.cps = prop;
};
Object.prototype.type = function(prop){
    if(this.XCType.toString() == "Shape") this.Properties.type = prop;
    return this.Properties.type;
};
Object.prototype.targetX = function (prop) {
    if(this.XCType.toString() == "Image" || this.XCType.toString() == "Shape") {
        this.Properties.tx = prop;
        if(this.Properties.x < this.Properties.tx){
            this.Properties.x++;
        } else {
            this.Properties.x--;
        }
    } else {
        Logger.error(7);
    }
};
Object.prototype.targetY = function (prop) {
    if(this.XCType.toString() == "Image" || this.XCType.toString() == "Shape") {
        this.Properties.ty = prop;
        if(this.Properties.y < this.Properties.ty){
            this.Properties.y++;
        } else {
            this.Properties.y--;
        }
    } else {
        Logger.error(7);
    }
};
Object.prototype.x = function (prop) {
    if(this.XCType.toString() == "Image" || this.XCType.toString() == "Shape") {
        this.Properties.x = prop;
        if(this.Properties.x < this.Properties.tx){
            this.Properties.x++;
        } else {
            this.Properties.x--;
        }
    } else {
        Logger.error(7);
    }
};
Object.prototype.y = function (prop) {
    if(this.XCType.toString() == "Image" || this.XCType.toString() == "Shape") {
        this.Properties.y = prop;
        if(this.Properties.y < this.Properties.ty){
            this.Properties.y++;
        } else {
            this.Properties.y--;
        }
    } else {
        Logger.error(7);
    }
};
Object.prototype.addAnimation = function(prop, delay = 200){
    if(this.Properties.animation == "none"){
        var i = 0,
            cs = this;
        if(this.XCType.toString() == "Image")
            eval("var a" + Animations.length + " = setInterval(function () { i++; if(i > prop.length-1) i = 0; cs.Properties.src = prop[i]; }, delay); Animations.push('a" + Animations.length + "'); cs.Properties.animation = 'a" + Animations.length + "'; window.a" + Animations.length + " = a" + Animations.length + ";");
        else
            Logger.error(7);
    }
};
Object.prototype.cancelAnimation = function(){
    if(this.XCType.toString() == "Image"){
        if(this.Properties.animation !== "none") {
            eval("clearInterval(" + this.Properties.animation + "); delete window.a" + this.Properties.animation + ";");
            this.Properties.animation = "none";
        }
    } else Logger.error(7);
};
Object.prototype.flip = function(prop){
    this.Properties.flipped = prop;
};
Object.prototype.getX = function(){
    return this.Properties.x;
};
Object.prototype.getY = function(){
    return this.Properties.y;
};
Object.prototype.getCPS = function(){
    return this.Properties.cps;
};
Object.prototype.getRadius = function(){
    return this.Properties.radius;
};
Object.prototype.getFont = function(){
    return this.Properties.font;
};
Object.prototype.getWidth = function(){
    return this.Properties.width;
};
Object.prototype.getHeight = function(){
    return this.Properties.height;
};
Object.prototype.getSrc = function(){
    return this.Properties.src;
};
Object.prototype.on = function (event, callback) {
    event = event.toLowerCase();
    if(event == "objectmove" || event == "objectcollision" || event == "objectclick") EventHandlers.push({name: this, Properties: {name: event, function: callback}});
    else Logger.error(4);
};