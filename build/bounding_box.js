"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoundingBox = void 0;
require("reflect-metadata");
class BoundingBox {
    constructor(x, y, width, height, confidence, class_ID) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.confidence = confidence;
        this.class_ID = class_ID;
    }
    make_absolute(imageWidth, imageHeight) {
        if (this.x <= 1 && this.y <= 1 && this.width <= 1 && this.height <= 1) {
            this.x = this.x * imageWidth;
            this.y = this.y * imageHeight;
            this.width = this.width * imageWidth;
            this.height = this.height * imageHeight;
        }
    }
    make_relative(imageWidth, imageHeight) {
        if (this.x >= 1 || this.y >= 1 || this.width >= 1 || this.height >= 1) {
            this.x = this.x / imageWidth;
            this.y = this.y / imageHeight;
            this.width = this.width / imageWidth;
            this.height = this.height / imageHeight;
        }
    }
    update_parameters(x, y, width, height, confidence, class_ID) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.confidence = confidence;
        this.class_ID = class_ID;
    }
}
exports.BoundingBox = BoundingBox;
