import "reflect-metadata";
import { Detection } from "./detection";

export class Batch {
  public readonly uuid: string;
  private study_name: string;
  private camera_id: string;
  private author_uuid: string;
  private creation_date: number;
  public confidence_threshold: number;
  public image_ids: string[];
  public detections: {
    [image_id: string]: Detection[];
  };
  public detected_classes: number[];

  constructor(
    uuid: string,
    study_name: string,
    camera_id: string,
    author_uuid: string,
    confidence_threshold: number
  ) {
    this.uuid = uuid;
    this.study_name = study_name;
    this.camera_id = camera_id;
    this.author_uuid = author_uuid;
    this.creation_date = Math.floor(new Date().getTime() / 1000);
    this.confidence_threshold = confidence_threshold;
    this.image_ids = [];
    this.detections = {};
    this.detected_classes = [];
  }

  public get_study_name(): string {
    return this.study_name;
  }

  public get_camera_id(): string {
    return this.camera_id;
  }

  public get_author_uuid(): string {
    return this.author_uuid;
  }

  public get_creation_date(): Date {
    return new Date(this.creation_date * 1000);
  }

  public get_confidence_threshold(): number {
    return this.confidence_threshold;
  }

  public set_confidence_threshold(confidence_threshold: number) {
    if (confidence_threshold >= 0 && confidence_threshold <= 1) {
      this.confidence_threshold = confidence_threshold;
    }
  }

  public get_num_images(): number {
    return this.image_ids.length;
  }

  public get_detected_classes(): number[] {
    return this.detected_classes;
  }

  public get_num_detected_classes(): number {
    return this.get_detected_classes().length;
  }

  // Convert image_id to image path
  public get_path_by_image_id(image_id: string): string {
    return this.study_name + "/data/" + this.uuid + "/image_" + image_id;
  }

  // Convert image path to image_id
  public get_image_id_by_path(image_path: string): string {
    return image_path.replace(
      this.study_name + "/data/" + this.uuid + "/image_",
      ""
    );
  }

  // Fetch all image IDs for a specific class
  public get_image_ids_by_class(class_id: number): string[] {
    let image_ids: string[] = [];

    // Iterate over all image_ids
    for (const image_id of this.image_ids) {
      // Iterate over all associated detections
      for (const detection of this.detections[image_id]) {
        // Check if the detection contains the correct class_id
        if (detection.class_id == class_id) {
          // Store the image_id, if not already included
          if (!image_ids.includes(image_id)) {
            image_ids.push(image_id);
          }
        }
      }
    }
    return image_ids;
  }

  // Fetch all image paths for a specific class
  public get_image_paths_by_class(class_id: number): string[] {
    const image_ids = this.get_image_ids_by_class(class_id);
    const image_paths = image_ids.map((image_id) =>
      this.get_path_by_image_id(image_id)
    );
    return image_paths;
  }

  // Fetch all detections for a specific class
  public get_detections_by_class(class_id: number): Detection[] {
    let detections: Detection[] = [];

    // Iterate over all image_ids
    for (const image_id of this.image_ids) {
      // Iterate over all associated detections
      for (const detection of this.detections[image_id]) {
        // Check if the detection contains the correct class_id
        if (detection.class_id == class_id) {
          // Store the detection, if not already included
          if (!detections.includes(detection)) {
            detections.push(detection);
          }
        }
      }
    }
    return detections;
  }

  // Fetch the number of detections for a specific class
  public get_num_detections_by_class(class_ID: number): number {
    return this.get_detections_by_class(class_ID).length;
  }

  // Fetch the total number of detections
  public get_num_detections(): number {
    return this.get_detected_classes().reduce(
      (partialSum, class_ID) =>
        partialSum + this.get_num_detections_by_class(class_ID),
      0
    );
  }

  // Fetch the confidence score averaged over all detections
  public get_avg_confidence_score(): number {
    const confidenceScores: number[] = [];
    this.image_ids?.forEach((image_id) => {
      this.detections[image_id]?.forEach((detection) => {
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
  public add_detections(image_id: string, detections: Detection[]) {
    // Initialize a this.detections array for this image_id, if nonexistent
    if (!this.detections[image_id]) {
      this.detections[image_id] = [];
    }

    // Add new detections to this.detections
    this.detections[image_id].push(...detections);

    // Add new classes to this.detected_classes
    for (const detection of detections) {
      if (!this.detected_classes.includes(detection.class_id)) {
        this.detected_classes.push(detection.class_id);
      }
    }
  }

  // Set detections associated with an image_id (replaces existing detections)
  public set_detections(image_id: string, detections: Detection[]) {
    // Update the this.detections array for this image
    this.detections[image_id] = detections;

    // Add classes to this.detected_classes
    for (const detection of detections) {
      if (!this.detected_classes.includes(detection.class_id)) {
        this.detected_classes.push(detection.class_id);
      }
    }

    // Check if any class_ids no longer have associated detections
    for (const class_id of this.get_detected_classes()) {
      if (!(this.get_num_detections_by_class(class_id) > 0)) {
        this.detected_classes.filter((item) => item !== class_id);
      }
    }
  }

  // Remove all detections associated with an image_id
  public remove_detections(image_id: string) {
    for (const detection of this.detections[image_id]) {
      this.remove_detection(image_id, detection);
    }
  }

  // Remove a specific detection associated with an image_id
  public remove_detection(image_id: string, provided_detection: Detection) {
    // Get index of the provided detection (-1 if not present)
    let index = this.detections[image_id].indexOf(provided_detection);

    // Remove the provided detection if present
    if (index > -1) {
      this.detections[image_id].splice(index, 1);
    }

    // Check if the class_id from the provided detection is still present in other detections
    if (this.get_num_detections_by_class(provided_detection.class_id) == 0) {
      this.detected_classes = this.detected_classes.filter(
        (class_id) => class_id !== provided_detection.class_id
      );
    }
  }

  // Remove all detections from databatch
  public remove_all_detections() {
    this.detections = {};
    this.detected_classes = [];
  }
}
