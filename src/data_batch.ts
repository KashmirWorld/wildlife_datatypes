import {Type} from 'class-transformer';
import { CameraStation } from "./camera_station";
import { Detections } from './detections';

export class DataBatch {
    public readonly uuid: string;
    public readonly date: number;
    public readonly author: string;
    public num_images: number;
    public note: string;
    public files: string[];

    @Type(() => CameraStation)
    public camera_station: CameraStation;

    @Type(() => Detections)
    public detections: { [id: string] : Detections[] };

    constructor(uuid: string, author: string, camera_station: CameraStation, num_images: number, note: string){
      this.uuid = uuid;
      this.date = Math.floor(new Date().getTime() / 1000);
      this.author = author;
      this.camera_station = camera_station;
      this.num_images = num_images;
      this.note = note;
      this.files = [];
      this.detections = {};
    };

    get data_as_data(): Date {
        return new Date(this.date * 1000)
    }

    get_detections_by_class(className: string): Detections[] {
        return this.detections[className];
    }
  };