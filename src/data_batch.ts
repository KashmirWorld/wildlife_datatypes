import 'reflect-metadata';

export class DataBatch {

    public readonly uuid: string;
    public readonly date: number;
    public readonly author: string;
    public readonly study_name: string;
    public readonly camera_station_id: string;
    public note: string;
    public file_paths: string[];
    public detections: { [id: string] : (Uint8Array | Float32Array | Int32Array)[] };
    public class_detections: { [id: number] : string[] };

    constructor(uuid: string, author: string, study_name: string, camera_station_id: string, note: string){
      this.uuid = uuid;
      this.date = Math.floor(new Date().getTime() / 1000);
      this.author = author;
      this.study_name = study_name;
      this.camera_station_id = camera_station_id;
      this.note = note;
      this.file_paths = [];
      this.detections = {};
      this.class_detections = {};
    };

    get_date_as_date(): Date {
        return new Date(this.date * 1000)
    }

    get_num_images(): number {
      return this.file_paths.length
    }

    get_images_by_detected_class(class_id: number): string[] {
        return this.class_detections[class_id];
    }

    add_detections(image_path: string, detections: (Uint8Array | Float32Array | Int32Array)[], class_IDs: number[]) {
      this.detections[image_path] = detections;
      for (const class_ID of class_IDs) {
        if (this.class_detections[class_ID]) {
          if (!this.class_detections[class_ID].includes(image_path)) {
            this.class_detections[class_ID] = [...this.class_detections[class_ID], image_path];
          }
        } else {
          this.class_detections[class_ID] = [image_path];
        }
      }
    }
  };