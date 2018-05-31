
const version = 1;
var Applications = [];

import Logger from "./Logger/Logger.js";

export default class Tethon {
    static get Version(){
        return version;
    }
    static get AppManager(){
        return class {
            static getApplications(){
                return Applications;
            }
            static getApplication(prop1, prop2){
                var x = new XMLHttpRequest();
                x.open("GET", "./" + prop1, false);
                x.send(null);
                eval(x.responseText);
                return x.responseText;
            }
            static Init(name, itversion = version) {
                Applications.push({
                    Properties: {
                        name: name,
                        api: itversion,
                        method: name.Main()
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
        xo.open("GET", "https://code.tethonjs.com/customs.json", false);
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
console.log("%cSuccess: %cTethon has been launched.", "font-weight: bold; color: #99C794", "");