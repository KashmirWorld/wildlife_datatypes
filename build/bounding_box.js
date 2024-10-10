"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoundingBox = void 0;
require("reflect-metadata");
class BoundingBox {
    constructor(x, y, width, height, confidence, classID) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.confidence = confidence;
        this.classID = classID;
    }
    get_parameters() {
        return {
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height,
            confidence: this.confidence,
            classID: this.classID,
        };
    }
    update_parameters(x, y, width, height, confidence, classID) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.confidence = confidence;
        this.classID = classID;
    }
}
exports.BoundingBox = BoundingBox;
