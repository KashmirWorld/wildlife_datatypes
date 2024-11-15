import "reflect-metadata";

export class BoundingBox {
  public x: number;
  public y: number;
  public width: number;
  public height: number;
  public confidence: number;
  public class_ID: number;

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
    this.class_ID = classID;
  }

  make_absolute(imageWidth: number, imageHeight: number) {
    if (this.x <= 1 && this.y <= 1 && this.width <= 1 && this.height <= 1) {
      this.x = this.x * imageWidth;
      this.y = this.y * imageHeight;
      this.width = this.width * imageWidth;
      this.height = this.height * imageHeight;
    }
  }

  make_relative(imageWidth: number, imageHeight: number) {
    if (this.x >= 1 || this.y >= 1 || this.width >= 1 || this.height >= 1) {
      this.x = this.x / imageWidth;
      this.y = this.y / imageHeight;
      this.width = this.width / imageWidth;
      this.height = this.height / imageHeight;
    }
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
    this.class_ID = classID;
  }
}
