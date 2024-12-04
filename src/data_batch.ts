import "reflect-metadata";
import { BoundingBox } from "./bounding_box";

export class DataBatch {
  public readonly uuid: string;
  public readonly date: number;
  public readonly author: string;
  public readonly study_name: string;
  public readonly camera_station_id: string;
  public note: string;
  public image_IDs: string[];
  public detections: {
    [image_id: string]: BoundingBox[];
  };
  public detected_classes: number[];
  public confidence_threshold: number;

  constructor(
    uuid: string,
    author: string,
    study_name: string,
    camera_station_id: string,
    note: string
  ) {
    this.uuid = uuid;
    this.date = Math.floor(new Date().getTime() / 1000);
    this.author = author;
    this.study_name = study_name;
    this.camera_station_id = camera_station_id;
    this.note = note;
    this.image_IDs = [];
    this.detections = {};
    this.detected_classes = [];
    this.confidence_threshold = 0.7;
  }

  // Fetch creation date
  get_date_as_date(): Date {
    return new Date(this.date * 1000);
  }

  // Fetch total number of images
  get_num_images(): number {
    return this.image_IDs.length;
  }

  // Convert image ID to image path
  get_path_by_image_id(image_ID: string): string {
    return this.study_name + "/data/" + this.uuid + "/image_" + image_ID;
  }

  // Convert image path to image ID
  get_image_id_by_path(image_path: string): string {
    return image_path.replace(
      this.study_name + "/data/" + this.uuid + "/image_",
      ""
    );
  }

  // Fetch all image IDs for a specific class
  get_image_IDs_by_class(class_ID: number): string[] {
    let image_IDs: string[] = [];

    // Iterate over all image_IDs
    for (const image_ID of this.image_IDs) {
      // Iterate over all associated detections
      for (const boundingBox of this.detections[image_ID]) {
        // Check if the detection contains the correct class_ID
        if (boundingBox.class_ID == class_ID) {
          // Store the image_ID, if not already included
          if (!image_IDs.includes(image_ID)) {
            image_IDs.push(image_ID);
          }
        }
      }
    }

    return image_IDs;
  }

  // Fetch all image paths for a specific class
  get_image_paths_by_class(class_id: number): string[] {
    const image_IDs = this.get_image_IDs_by_class(class_id);
    const image_paths = image_IDs.map((image_ID) =>
      this.get_path_by_image_id(image_ID)
    );

    return image_paths;
  }

  // Fetch all detected classes
  get_detected_classes(): number[] {
    return this.detected_classes;
  }

  // Fetch the number of classes detected
  get_num_detected_classes(): number {
    return this.get_detected_classes().length;
  }

  // Fetch all detections for a specific class
  get_detections_by_class(class_ID: number): BoundingBox[] {
    let detections: BoundingBox[] = [];

    // Iterate over all image_IDs
    for (const image_ID of this.image_IDs) {
      // Iterate over all associated detections
      for (const boundingBox of this.detections[image_ID]) {
        // Check if the detection contains the correct class_ID
        if (boundingBox.class_ID == class_ID) {
          // Store the detection, if not already included
          if (!detections.includes(boundingBox)) {
            detections.push(boundingBox);
          }
        }
      }
    }

    return detections;
  }

  // Fetch the number of detections for a specific class
  get_num_detections_by_class(class_ID: number): number {
    return this.get_detections_by_class(class_ID).length;
  }

  // Fetch the total number of detections
  get_num_detections(): number {
    return this.get_detected_classes().reduce(
      (partialSum, class_ID) =>
        partialSum + this.get_num_detections_by_class(class_ID),
      0
    );
  }

  // Fetch the confidence score averaged over all detections
  get_avg_confidence_score(): number {
    const confidenceScores: number[] = [];
    this.image_IDs?.forEach((image_ID) => {
      this.detections[image_ID]?.forEach((detection) => {
        confidenceScores.push(detection.confidence);
      });
    });
    return Number(
      confidenceScores.reduce(
        (partialSum, current) => partialSum + current,
        0
      ) / confidenceScores.length
    );
  }

  // Add detections associated with an image ID (keeps existing detections)
  add_detections(image_ID: string, detections: BoundingBox[]) {
    // Initialize a this.detections array for this image_ID, if nonexistent
    if (!this.detections[image_ID]) {
      this.detections[image_ID] = [];
    }

    // Add new detections to this.detections
    this.detections[image_ID].push(...detections);

    // Add new classes to this.detected_classes
    for (const detection of detections) {
      if (!this.detected_classes.includes(detection.class_ID)) {
        this.detected_classes.push(detection.class_ID);
      }
    }
  }

  // Set detections associated with an image ID (replaces existing detections)
  set_detections(image_ID: string, detections: BoundingBox[]) {
    // Update the this.detections array for this image
    this.detections[image_ID] = detections;

    // Add classes to this.detected_classes
    for (const detection of detections) {
      if (!this.detected_classes.includes(detection.class_ID)) {
        this.detected_classes.push(detection.class_ID);
      }
    }

    // Check if any class IDs no longer have associated detections
    for (const class_ID of this.get_detected_classes()) {
      if (!(this.get_num_detections_by_class(class_ID) > 0)) {
        this.detected_classes.filter((item) => item !== class_ID);
      }
    }
  }

  // Remove all detections associated with an image ID
  remove_detections(image_ID: string) {
    for (const detection of this.detections[image_ID]) {
      this.remove_detection(image_ID, detection);
    }
  }

  // Remove a specific detection associated with an image ID
  remove_detection(image_ID: string, provided_detection: BoundingBox) {
    // Get index of the provided detection (-1 if not present)
    let index = this.detections[image_ID].indexOf(provided_detection);

    // Remove the provided detection if present
    if (index > -1) {
      this.detections[image_ID].splice(index, 1);
    }

    // Check if the class ID from the provided detection is still present in other detections
    if (this.get_num_detections_by_class(provided_detection.class_ID) == 0) {
      this.detected_classes = this.detected_classes.filter(
        (class_ID) => class_ID !== provided_detection.class_ID
      );
    }
  }

  // Remove all detections from databatch
  remove_all_detections() {
    this.detections = {};
    this.detected_classes = [];
  }
}
