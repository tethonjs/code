
import Tethon from "../Core.js";

export default class Logger {
    static error(n) {
        loadJSON(function(data){
            console.log("%cError: %c" + eval("data." + Tethon.Language + ".codes.e" + n), "font-weight: bold; color: #EC5f67", "");
        });
    }
}

//Auxiliary functions
function loadJSON(callback){var x=new XMLHttpRequest();x.open("GET","https://code.tethonjs.com/customs.json",true);x.onreadystatechange=function(){if(x.readyState==4 && x.status=="200"){return callback(JSON.parse(x.responseText));}};x.send(null);}