import Logger from "../Logger/Logger.js";
var UIObjects = [];

export default class XCUIObject {
    constructor(XCType) {
        this.XCType = XCType;
        if(XCType == "text" || XCType == "button" || XCType == "input"){
            if(XCType == "button"){
                UIObjects.push({
                    XCType: XCType,
                    Properties: {
                        x: 0,
                        y: 0
                    }
                });
            }
            if(XCType == "input"){
                UIObjects.push({
                    XCType: XCType,
                    Properties: {
                        x: 0,
                        y: 0
                    }
                });
            }
            if(XCType == "text"){
                UIObjects.push({
                    XCType: XCType,
                    Properties: {
                        x: 0,
                        y: 0
                    }
                });
            }
        } else {
            Logger.error(3);
        }
    }
}