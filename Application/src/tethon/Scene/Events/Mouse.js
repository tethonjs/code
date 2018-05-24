var x        = 0,
    y        = 0,
    active   = false,
    dragging = false;

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
    static isDragging(){
        return dragging;
    }
}

//Mouse
window.onmousedown = function (event) {
    active = false;
    dragging = true;
    x = event.clientX;
    y = event.clientY;
};
window.onmousemove = function(){
    x = event.clientX;
    y = event.clientY;
    if(active) active = false;
};
window.onmouseup = function () {
    active = true;
    dragging = false;
    setTimeout(function () {
        active = false;
    },25);
};
//Touch screen
window.ontouchstart = function (event) {
    active = false;
    dragging = true;
    x = event.touches[0].clientX;
    y = event.touches[0].clientY;
};
window.ontouchmove = function(event){
    x = event.touches[0].clientX;
    y = event.touches[0].clientY;
    if(active) active = false;
};
window.ontouchcancel = function () {
    active = true;
    setTimeout(function () {
        active = false;
    },25);
    dragging = false;
};
window.ontouchend = function () {
    active = true;
    setTimeout(function () {
        active = false;
    },25);
    dragging = false;
};