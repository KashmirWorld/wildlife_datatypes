import "reflect-metadata";
export declare class BoundingBox {
    x: number;
    y: number;
    width: number;
    height: number;
    confidence: number;
    classID: number;
    constructor(x: number, y: number, width: number, height: number, confidence: number, classID: number);
    update_parameters(x: number, y: number, width: number, height: number, confidence: number, classID: number): void;
}
