
import XepCore from "../Core.js";

function loadJSON(callback){
    var x = new XMLHttpRequest();
    x.open("GET", "xepcore/Logger/customs.json", true);
    x.onreadystatechange = function(){
        if(x.readyState == 4 && x.status == "200"){
            return callback(JSON.parse(x.responseText));
        }
    }
    x.send(null);
}

export default class Logger {
    static error(n){
        if(n == 6){
            loadJSON(function(data){
                console.log(eval("data." + XepCore.Language + ".codes.e" + n));
            });
        } else {
            loadJSON(function(data){
                console.error(eval("data." + XepCore.Language + ".codes.e" + n));
            });
        }
    }
}