
const version = 1;
var Applications = [];

import Logger from "./Logger/Logger.js";

export default class XepCore {
    static get Version(){
        return version;
    }
    static get AppManager(){
        return class {
            static get Applications(){
                return Applications;
            }
            static Init(name, itversion = 1.0) {
                Applications.push({
                    Properties: {
                        name: name,
                        api: itversion
                    }
                });
                for (var i = 0; i < Applications.length; i++) {
                    if (i == Applications.length - 1 && Applications[i].Properties.name != name) {
                        Logger.error(1);
                    }
                    if (Applications[i].Properties.name == name) {
                        if (Applications[i].Properties.api == version) Applications[i].Properties.name.Main(); else Logger.error(2);
                    }
                }
            }
        }
    }
    static get Language(){
        var x = new XMLHttpRequest();
        x.open("GET", "./language.json", false);
        x.send(null);
        var xo = new XMLHttpRequest();
        xo.open("GET", "xepcore/Logger/customs.json", false);
        xo.send(null);
        var avaliable = JSON.stringify(Object.keys(JSON.parse(xo.response)));
        if(avaliable.search(JSON.stringify(JSON.parse(x.response).language)) != -1){
            return JSON.parse(x.response).language;
        } else {
            console.error("Enter a valid language, please.");
            return "ENG";
        }
    }
}
console.log("%c    \n\n\n\n", "font-size:26px;background:url('https://xepcore.com/images/mstile-70x70.png') no-repeat;background-position:left top;padding-bottom:80px;padding-right:80px;padding-top:-80px;");