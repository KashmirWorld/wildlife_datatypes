import "reflect-metadata";
export declare class BoundingBox {
    x: number;
    y: number;
    width: number;
    height: number;
    confidence: number;
    class_ID: number;
    constructor(x: number, y: number, width: number, height: number, confidence: number, classID: number);
    make_absolute(imageWidth: number, imageHeight: number): void;
    make_relative(imageWidth: number, imageHeight: number): void;
    update_parameters(x: number, y: number, width: number, height: number, confidence: number, classID: number): void;
}
