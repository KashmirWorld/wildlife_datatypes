"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Detection = void 0;
require("reflect-metadata");
class Detection {
    constructor(x, y, width, height, confidence, class_ID) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.confidence = confidence;
        this.class_ID = class_ID;
    }
    make_valid(imageWidth, imageHeight) {
        // Fix detections with a negative width
        if (this.width < 0) {
            let newX = this.x + this.width;
            let newWidth = this.width * -1;
            // Check if newX is not outside of image
            if (newX >= 0) {
                this.x = newX;
            }
            else {
                this.x = 0;
            }
            // Check if newWidth is not outside of image
            if (newX + newWidth <= imageWidth) {
                this.width = newWidth;
            }
            else {
                this.width = imageWidth - newX;
            }
        }
        // Fix detections with a negative height
        if (this.height < 0) {
            let newY = this.y + this.height;
            let newHeight = this.height * -1;
            // Check if newY is not outside of image
            if (newY >= 0) {
                this.y = newY;
            }
            else {
                this.y = 0;
            }
            // Check if newHeight is not outside of image
            if (newY + newHeight <= imageHeight) {
                this.height = newHeight;
            }
            else {
                this.height = imageHeight - newY;
            }
        }
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
}
exports.Detection = Detection;
