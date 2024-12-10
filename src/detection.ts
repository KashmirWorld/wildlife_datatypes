import "reflect-metadata";

export class Detection {
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
    class_ID: number
  ) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.confidence = confidence;
    this.class_ID = class_ID;
  }

  make_valid(imageWidth: number, imageHeight: number) {
    // Fix detections with a negative width
    if (this.width < 0) {
      let newX = this.x + this.width;
      let newWidth = this.width * -1;

      // Check if newX is not outside of image
      if (newX >= 0) {
        this.x = newX;
      } else {
        this.x = 0;
      }

      // Check if newWidth is not outside of image
      if (newX + newWidth <= imageWidth) {
        this.width = newWidth;
      } else {
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
      } else {
        this.y = 0;
      }

      // Check if newHeight is not outside of image
      if (newY + newHeight <= imageHeight) {
        this.height = newHeight;
      } else {
        this.height = imageHeight - newY;
      }
    }
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
}
