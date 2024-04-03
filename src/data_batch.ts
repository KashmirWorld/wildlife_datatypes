import "reflect-metadata";

export class DataBatch {
  public readonly id: string;
  public readonly date: number;
  public readonly author: string;
  public readonly study_name: string;
  public readonly camera_station_id: string;
  public note: string;
  public image_IDs: string[];
  public detections: {
    [id: string]: (Uint8Array | Float32Array | Int32Array)[];
  };
  public class_detections: { [id: number]: string[] };
  public confidence_threshold: number;

  constructor(
    id: string,
    author: string,
    study_name: string,
    camera_station_id: string,
    note: string
  ) {
    this.id = id;
    this.date = Math.floor(new Date().getTime() / 1000);
    this.author = author;
    this.study_name = study_name;
    this.camera_station_id = camera_station_id;
    this.note = note;
    this.image_IDs = [];
    this.detections = {};
    this.class_detections = {};
    this.confidence_threshold = 0.7;
  }

  get_date_as_date(): Date {
    return new Date(this.date * 1000);
  }

  get_num_images(): number {
    return this.image_IDs.length;
  }

  get_path_by_image_id(image_ID: string) {
    return this.study_name + "/data/" + this.id + "/image_" + image_ID;
  }

  get_image_id_by_path(image_path: string) {
    return image_path.replace(
      this.study_name + "/data/" + this.id + "/image_",
      ""
    );
  }

  get_image_IDs_by_class(class_id: number): string[] {
    return this.class_detections[class_id];
  }

  get_image_paths_by_class(class_id: number): string[] {
    return this.get_image_IDs_by_class(class_id).map((image_ID) =>
      this.get_path_by_image_id(image_ID)
    );
  }

  get_detected_classes(): number[] {
    return Object.keys(this.class_detections).map((class_ID) =>
      Number(class_ID)
    );
  }

  get_num_detected_classes(): number {
    return this.get_detected_classes().length;
  }

  get_num_detections_by_class(class_id: number): number {
    return this.class_detections[class_id].length;
  }

  get_num_detections(): number {
    return this.get_detected_classes().reduce(
      (partialSum, class_id) =>
        partialSum + this.get_num_detections_by_class(class_id),
      0
    );
  }

  get_avg_confidence_score(): number {
    const confidenceScores: number[] = [];
    this.image_IDs.forEach((image_ID) => {
      this.detections[image_ID].forEach((detection) => {
        confidenceScores.push(detection[4]);
      });
    });
    return Number(
      confidenceScores.reduce(
        (partialSum, current) => partialSum + current,
        0
      ) / confidenceScores.length
    );
  }

  add_detections(
    image_ID: string,
    detections: (Uint8Array | Float32Array | Int32Array)[]
  ) {
    this.detections[image_ID] = detections;

    for (const detection of detections) {
      const class_ID = detection[5];
      if (this.class_detections[class_ID]) {
        if (!this.class_detections[class_ID].includes(image_ID)) {
          this.class_detections[class_ID] = [
            ...this.class_detections[class_ID],
            image_ID,
          ];
        }
      } else {
        this.class_detections[class_ID] = [image_ID];
      }
    }
  }

  remove_detection(
    image_ID: string,
    provided_detection: Uint8Array | Float32Array | Int32Array
  ) {
    // Check that the detection exists in this.detections
    let index = this.detections[image_ID].indexOf(provided_detection);
    if (index > -1) {
      // Remove detection from this.detections
      this.detections[image_ID].splice(index, 1);
    }

    // Check that there are no other detections with the same class
    const detections = this.detections[image_ID];
    if (
      !detections.some((detection) => detection[5] === provided_detection[5])
    ) {
      // Remove image_ID from this.class_detections
      const index =
        this.class_detections[provided_detection[5]].indexOf(image_ID);
      if (index > -1) {
        this.class_detections[provided_detection[5]].splice(index, 1);
      }
    }
  }

  remove_all_detections() {
    this.detections = {};
    this.class_detections = {};
  }
}
