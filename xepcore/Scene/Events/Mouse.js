var x = 0,
    y = 0,
    active = false;

export default class Mouse {
    static get x() {
        return x;
    }
    static get y() {
        return y;
    }
    static isActive(){
        return active;
    }
}
window.onmousedown = function (event) {
    active = true;
    x = event.clientX;
    y = event.clientY;
    setTimeout(function () {
        active = false;
    },25);
}
window.onmousemove = function(){
    if(active) active = false;
}
window.onmouseup = function () {
    active = false;
}