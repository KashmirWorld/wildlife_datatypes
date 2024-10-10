import "reflect-metadata";

export class BoundingBox {
  private x: number;
  private y: number;
  private width: number;
  private height: number;
  private confidence: number;
  private classID: number;

  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    confidence: number,
    classID: number
  ) {
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

  update_parameters(
    x: number,
    y: number,
    width: number,
    height: number,
    confidence: number,
    classID: number
  ) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.confidence = confidence;
    this.classID = classID;
  }
}
