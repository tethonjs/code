import Mouse from "./Events/Mouse.js";
import THObject from "./Object.js"

var Scenes = [],
    Objects = [];

export default class THScene {
    constructor(getter){
        this.getter = getter;
        Scenes.push({
            Properties: {
                element: getter
            }
        });
        return getter.getContext("2d");
    }
    static objects(){return Objects;}
};
CanvasRenderingContext2D.prototype.quality = function (prop) {
    this.imageSmoothingQuality = prop;
};
CanvasRenderingContext2D.prototype.getQuality = function () {
    return this.imageSmoothingQuality;
};
CanvasRenderingContext2D.prototype.width = function (prop) {
    this.canvas.style.width = prop + "px";
    this.canvas.width = prop;
};
CanvasRenderingContext2D.prototype.height = function (prop) {
    this.canvas.style.height = prop + "px";
    this.canvas.height = prop;
};
CanvasRenderingContext2D.prototype.getWidth = function () {
    return Math.abs(this.canvas.getAttribute("width"));
};
CanvasRenderingContext2D.prototype.getHeight = function () {
    return Math.abs(this.canvas.getAttribute("height"));
};
CanvasRenderingContext2D.prototype.addObject = function (prop) {
    let cs = this;
    Objects.push(prop);
    if (prop.THType == "Image") {
        var img = new Image();
        img.src = prop.Properties.src;
        img.width = prop.Properties.width;
        img.height = prop.Properties.height;
        img.onload = function () {
            cs.drawImage(img, prop.Properties.x, prop.Properties.y, prop.Properties.width, prop.Properties.height);
        }
    }
    if (prop.THType == "Shape") {
        if(prop.Properties.type == "circle"){
            cs.beginPath();
            cs.arc(prop.Properties.x,prop.Properties.y,prop.Properties.radius,0,2*Math.PI);
            cs.fillStyle = prop.Properties.color;
            cs.fill();
        }
    }
};
CanvasRenderingContext2D.prototype.update = function () {
    var cs = this;
    cs.clearRect(0,0,cs.canvas.width,cs.canvas.height);
    // console.log(cs);
    Objects.forEach(function (prop) {
        let x = prop.Properties.x,
            y = prop.Properties.y;
        if(prop.Properties.topacity > prop.Properties.opacity) prop.Properties.opacity += prop.Properties.cps;
        if(prop.Properties.topacity < prop.Properties.opacity) prop.Properties.opacity -= prop.Properties.cps;
        if(prop.Properties.opacity < 1) {
            prop.Properties.opacity = Math.abs(prop.Properties.opacity);
            cs.globalAlpha = prop.Properties.opacity;
        }
        if(prop.Properties.tx > prop.Properties.x && prop.Properties.tx !== 0) prop.Properties.x += prop.Properties.cps;
        if(prop.Properties.tx < prop.Properties.x && prop.Properties.tx !== 0) prop.Properties.x -= prop.Properties.cps;
        if(prop.Properties.ty > prop.Properties.y && prop.Properties.ty !== 0) prop.Properties.y += prop.Properties.cps;
        if(prop.Properties.ty < prop.Properties.y && prop.Properties.ty !== 0) prop.Properties.y -= prop.Properties.cps;

        if(prop.Properties.trotate > prop.Properties.rotate && prop.Properties.trotate !== "none") prop.Properties.rotate += 0.1 * prop.Properties.cps;
        if(prop.Properties.trotate < prop.Properties.rotate && prop.Properties.trotate !== "none") prop.Properties.rotate -= 0.1 * prop.Properties.cps;

        if(prop.Properties.radius <= prop.Properties.tradius && prop.Properties.tradius != prop.Properties.radius-1) prop.Properties.radius += prop.Properties.cps;
        if(prop.Properties.radius >= prop.Properties.tradius && prop.Properties.tradius != prop.Properties.radius-1) prop.Properties.radius -= prop.Properties.cps;
        if (prop.THType == "Image") {
            var img = new Image();
            img.src = prop.Properties.src;
            img.width = prop.Properties.width;
            img.height = prop.Properties.height;
            if(prop.Properties.flipped){
                var img = new Image();
                img.src = prop.Properties.src;
                img.width = prop.Properties.width;
                img.height = prop.Properties.height;
                if(prop.Properties.rotate !== "none"){
                    cs.save();
                    cs.translate(prop.Properties.x, prop.Properties.y);
                    cs.rotate(prop.Properties.rotate * Math.PI / 180);
                        drawImage(cs, img, 0, 0, prop.Properties.width, prop.Properties.height, 0, true);
                    cs.restore();
                }
            } else {
                if(prop.Properties.rotate !== "none"){
                    cs.save();
                    cs.translate(prop.Properties.x, prop.Properties.y);
                    cs.rotate(prop.Properties.rotate * Math.PI / 180);
                        cs.drawImage(img, 0, 0, prop.Properties.width, prop.Properties.height);
                    cs.restore();
                }
            }
        }
        if (prop.THType == "Shape") {
            if(prop.Properties.type == "circle"){
                cs.beginPath();
                cs.arc(prop.Properties.x,prop.Properties.y,prop.Properties.radius,0,2*Math.PI);
                cs.fillStyle = prop.Properties.color;
                cs.fill();
            }
            if(prop.Properties.type == "square"){
                if(prop.Properties.rotate !== "none"){
                    cs.save();
                    cs.translate(prop.Properties.x, prop.Properties.y);
                    cs.rotate(prop.Properties.rotate * Math.PI / 180);
                        cs.beginPath();
                        cs.rect(0, 0, prop.Properties.width, prop.Properties.height);
                        cs.fillStyle = prop.Properties.color;
                        cs.fill();
                    cs.restore();
                } else {
                    cs.beginPath();
                    cs.rect(prop.Properties.x, prop.Properties.y, prop.Properties.width, prop.Properties.height);
                    cs.fillStyle = prop.Properties.color;
                    cs.fill();
                }

            }
        }
        // ONOBJECTCLICK
        if(Mouse.isActive()){
            if(prop.THType.toString() == "Shape") {
                if (prop.Properties.type.toString() == "circle") {
                    let o1 = {x: prop.Properties.x, y: prop.Properties.y, width: prop.Properties.radius, height: prop.Properties.radius},
                        o2 = {x: Mouse.x, y: Mouse.y, width: 5, height: 10};
                     if(isColliding(o1, o2)){
                        prop.events.click();
                     }
                }
            }
        }
        // END


        // //objectmove
        // if(x !== prop.Properties.x || y !== prop.Properties.y) {
        //     if(prop.event.objectmove)
        //         prop.event.objectmove();
        // }
        // //objectcollision

        // //end
        //     // var selement;
        //     // Objects.forEach(function (element, index) {
        //     //     if(index+1 < Objects.length)
        //     //         selement = Objects[index+1];
        //     //     else
        //     //         selement = Objects[0];
        //     //     if(element.Properties.x < selement.Properties.x + selement.Properties.width && element.Properties.x + element.Properties.width > selement.Properties.x && element.Properties.y < selement.Properties.y + selement.Properties.height && element.Properties.height + element.Properties.y > selement.Properties.y){
        //     //         var n = prop.constructor.name;
        //     //         THObject.get().forEach(function (nelement) {
        //     //             if(nelement.constructor.name == n.replace("TH","") && nelement.Properties.name == "objectcollision"){
        //     //                 if(JSON.stringify(element.Properties) == JSON.stringify(Objects[index].Properties)){
        //     //                     nelement.Properties.function();
        //     //                 }
        //     //             }
        //     //         });
        //     //     }
        //     // });
        // //end
        // //objectclick
        // if(Mouse.isActive()){
        //     if(prop.THType.toString() == "Shape"){
        //         if(prop.Properties.type.toString() == "circle"){
        //             if(Mouse.x > (prop.Properties.x - prop.Properties.radius) && Mouse.x < (prop.Properties.x + prop.Properties.radius)){
        //                 if(Mouse.y > (prop.Properties.y - prop.Properties.radius) && Mouse.y < (prop.Properties.y + prop.Properties.radius)){
        //                     if(prop.event.objectclick)
        //                         prop.event.objectclick();
        //                 }
        //             }
        //         }
        //         if(prop.Properties.type.toString() == "square"){
        //             if(Mouse.x > (prop.Properties.x - prop.Properties.width) && Mouse.x < (prop.Properties.x + prop.Properties.width)){
        //                 if(Mouse.y > (prop.Properties.y - prop.Properties.height) && Mouse.y < (prop.Properties.y + prop.Properties.height)){
        //                     if(prop.event.objectclick)
        //                         prop.event.objectclick();
        //                 }
        //             }
        //         }
        //     }
        //     if(prop.THType.toString() == "Image"){
        //         if(Mouse.x > (prop.Properties.x - prop.Properties.width) && Mouse.x < (prop.Properties.x + prop.Properties.width)){
        //             if(Mouse.y > (prop.Properties.y - prop.Properties.height) && Mouse.y < (prop.Properties.y + prop.Properties.height)){
        //                 if(prop.event.objectclick)
        //                     prop.event.objectclick();
        //             }
        //         }
        //     }
        // }
        // //end
        // cs.globalAlpha = 1;
        // //ONOBJECTMOVE
        // // if(x !== prop.Properties.x || y !== prop.Properties.y){
        // //     var n = prop.constructor.name;
        // //     THObject.get().forEach(function (element) {
        // //         if(element.constructor.name == n.replace("TH","") && element.Properties.name == "objectmove")
        // //             element.Properties.function();
        // //     });
        // //     //ONOBJECTCOLLISIONDETECT
        // //     // var selement;
        // //     // Objects.forEach(function (element, index) {
        // //     //     if(index+1 < Objects.length)
        // //     //         selement = Objects[index+1];
        // //     //     else
        // //     //         selement = Objects[0];
        // //     //     if(element.Properties.x < selement.Properties.x + selement.Properties.width && element.Properties.x + element.Properties.width > selement.Properties.x && element.Properties.y < selement.Properties.y + selement.Properties.height && element.Properties.height + element.Properties.y > selement.Properties.y){
        // //     //         var n = prop.constructor.name;
        // //     //         THObject.get().forEach(function (nelement) {
        // //     //             if(nelement.constructor.name == n.replace("TH","") && nelement.Properties.name == "objectcollision"){
        // //     //                 if(JSON.stringify(element.Properties) == JSON.stringify(Objects[index].Properties)){
        // //     //                     nelement.Properties.function();
        // //     //                 }
        // //     //             }
        // //     //         });
        // //     //     }
        // //     // });
        // //     //END
        // // }
        // //END
        // //ONOBJECTCLICK
        // // if(Mouse.isActive()){
        // //     if(prop.THType.toString() == "Shape"){
        // //         if(prop.Properties.type.toString() == "circle"){
        // //             if(Mouse.x > (prop.Properties.x - prop.Properties.radius) && Mouse.x < (prop.Properties.x + prop.Properties.radius)){
        // //                 if(Mouse.y > (prop.Properties.y - prop.Properties.radius) && Mouse.y < (prop.Properties.y + prop.Properties.radius)){
        // //                     var n = prop.constructor.name;
        // //                     THObject.get().forEach(function (element) {
        // //                     if(element.constructor.name == n.replace("TH","") && element.Properties.name == "objectclick")
        // //                         element.Properties.function();
        // //                     });
        // //                 }
        // //             }
        // //         }
        // //         if(prop.Properties.type.toString() == "square"){
        // //             if(Mouse.x > (prop.Properties.x - prop.Properties.width) && Mouse.x < (prop.Properties.x + prop.Properties.width)){
        // //                 if(Mouse.y > (prop.Properties.y - prop.Properties.height) && Mouse.y < (prop.Properties.y + prop.Properties.height)){
        // //                     var n = prop.constructor.name;
        // //                 THObject.get().forEach(function (element) {
        // //                     if(element.constructor.name == n.replace("TH","") && element.Properties.name == "objectclick")
        // //                         element.Properties.function();
        // //                 });
        // //                 }
        // //             }
        // //         }
        // //     }
        // //     if(prop.THType.toString() == "Image"){
        // //         if(Mouse.x > (prop.Properties.x - prop.Properties.width) && Mouse.x < (prop.Properties.x + prop.Properties.width)){
        // //             if(Mouse.y > (prop.Properties.y - prop.Properties.height) && Mouse.y < (prop.Properties.y + prop.Properties.height)){
        // //                 var n = prop.constructor.name;
        // //                 THObject.get().forEach(function (element) {
        // //                     if(element.constructor.name == n.replace("TH","") && element.Properties.name == "objectclick")
        // //                         element.Properties.function();
        // //                 });
        // //             }
        // //         }
        // //     }
        // //
        // // }
        // //END
        cs.globalAlpha = 1;
    });
    requestAnimationFrame(function () {
        cs.update();
    });
};
function backingScale(context) {
    if ('devicePixelRatio' in window) {
        if (window.devicePixelRatio > 1) {
            return window.devicePixelRatio;
        }
    }
    return 1;
}
function drawImage(context,img,x,y,width,height,deg,flip,flop,center){context.save();if(typeof width === "undefined") width = img.width;if(typeof height === "undefined") height = img.height;if(typeof center === "undefined") center = false;if(center) {x -= width/2;y -= height/2;}var flipScale = 1,flopScale = 1;context.translate(x + width/2, y + height/2);var rad = 2 * Math.PI - deg * Math.PI / 180;context.rotate(rad);if(flip) flipScale = -1; else flipScale = 1;if(flop) flopScale = -1; else flopScale = 1;context.scale(flipScale, flopScale);context.drawImage(img, -width/2, -height/2, width, height);context.restore();}
function isColliding(a,b){return !(((a.y+a.height)<(b.y))||(a.y>(b.y+b.height))||((a.x+a.width)<b.x)||(a.x>(b.x+b.width)));}