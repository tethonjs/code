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
};
window.onmousemove = function(){
    if(active) active = false;
};
window.onmouseup = function () {
    active = false;
};

window.ontouchstart = function (event) {
    active = true;
    x = event.touches[0].clientX;
    y = event.touches[0].clientY;
    setTimeout(function () {
        active = false;
    },25);
};
window.ontouchmove = function(){
    if(active) active = false;
};
window.ontouchend = function () {
    active = false;
};
window.ontouchcancel = function () {
    active = false;
};