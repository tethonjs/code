import XCScene from "./Scene.js";
import Logger from "../Logger/Logger.js";

var Animations = [];

export default class XCObject {
    constructor(XCType){
        this.XCType = XCType;
        if(XCType.toString() == "Image") {
            this.Properties = {
                src: null
            };
        }
        if(XCType.toString() == "Shape"){
            this.Properties = {
                type: "circle",
                color: "#444",
                radius: 10,
                tradius: 10
            }
        }
        this.Properties.x = 0;
        this.Properties.y = 0
        this.Properties.tx = 0;
        this.Properties.ty = 0;
        this.Properties.cps = 1;
        this.Properties.width = 0;
        this.Properties.height = 0;
        this.Properties.twidth = 0;
        this.Properties.theight = 0;
        this.Properties.opacity = 1;
        this.Properties.topacity = 1;
        this.Properties.flipped = false;
        this.Properties.trotate = 0;
        this.Properties.rotate = 0;
        this.Properties.animation = "none";
    }
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
Object.prototype.remove = function() {
    for(var i = XCScene.objects().length; i--;) {
        if(XCScene.objects()[i] === this) {
            XCScene.objects().splice(i, 1);
            delete this;
        }
    }
};
Object.prototype.opacity = function(prop) {
    this.Properties.opacity = prop;
};
Object.prototype.targetOpacity = function(prop) {
    this.Properties.topacity = prop;
};
Object.prototype.rotate = function(prop) {
    this.Properties.rotate = prop;
};
Object.prototype.targetRotate = function(prop) {
    this.Properties.trotate = prop;
};
Object.prototype.getRotatation = function() {
    return this.Properties.rotate;
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
    this.Properties.x = prop;
    if(this.Properties.x < this.Properties.tx){
        this.Properties.x++;
    } else {
        this.Properties.x--;
    }
};
Object.prototype.y = function (prop) {
    this.Properties.y = prop;
    if(this.Properties.y < this.Properties.ty){
        this.Properties.y++;
    } else {
        this.Properties.y--;
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
Object.prototype.getOpacity = function(){
    return this.Properties.opacity;
};
Object.prototype.getSrc = function(){
    return this.Properties.src;
};