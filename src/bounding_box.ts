import "reflect-metadata";

export class BoundingBox {
  public x: number;
  public y: number;
  public width: number;
  public height: number;
  public confidence: number;
  public classID: number;

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
