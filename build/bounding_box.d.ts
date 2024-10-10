import "reflect-metadata";
export declare class BoundingBox {
    private x;
    private y;
    private width;
    private height;
    private confidence;
    private classID;
    constructor(x: number, y: number, width: number, height: number, confidence: number, classID: number);
    get_parameters(): {
        x: number;
        y: number;
        width: number;
        height: number;
        confidence: number;
        classID: number;
    };
    update_parameters(x: number, y: number, width: number, height: number, confidence: number, classID: number): void;
}
