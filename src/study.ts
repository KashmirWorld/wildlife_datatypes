import { CameraStation } from "./camera_station";
import { WildlifeSighting } from "./wildlife_sighting";
import { Type } from "class-transformer";
import "reflect-metadata";

export class Study {
  public name: string;
  public readonly project_uuid: string;
  public readonly start_date: number;
  public end_date: number;
  public description: string;
  public threshold: number;
  // This field refers to the date that this studies data was updated, the data being the properties above ^^
  // this doesn't include camera_stations as they house their own lastupdated property
  public lastupdated: number;
  public data_batch_ids: string[];

  @Type(() => CameraStation)
  public camera_stations: CameraStation[];
  @Type(() => WildlifeSighting)
  public wildlife_sightings: WildlifeSighting[];

  constructor(
    uuid: string,
    name: string,
    end_date: number,
    description: string,
    threshold: number
  ) {
    this.name = name;
    this.project_uuid = uuid;
    this.start_date = Math.floor(new Date().getTime() / 1000);
    this.end_date = end_date;
    this.description = description;
    this.threshold = threshold;
    this.camera_stations = [];
    this.wildlife_sightings = [];
    this.data_batch_ids = [];
    this.lastupdated = this.start_date;
  }

  get_start_date_as_date(): Date {
    return new Date(this.start_date * 1000);
  }

  get_end_date_as_date(): Date {
    return new Date(this.end_date * 1000);
  }

  get_last_updated_as_date(): Date {
    return new Date(this.lastupdated * 1000);
  }

  add_camera_station(camera_station: CameraStation) {
    this.camera_stations.push(camera_station);
  }

  remove_camera_station(camera_station: CameraStation) {
    this.camera_stations.splice(
      this.camera_stations.findIndex((x) => x.id === camera_station.id),
      1
    );
  }

  get_camera_station_by_id(id: string): CameraStation | null {
    let returnValue = null;
    this.camera_stations.forEach(function (camera_station) {
      if (camera_station.id == id) {
        returnValue = camera_station;
      }
    });
    return returnValue;
  }

  get_camera_station_by_camera_id(camera_id: string): CameraStation | null {
    for (let camera_station of this.camera_stations) {
      if (camera_station.camera_id == camera_id) {
        return camera_station;
      }
    }
    return null;
  }

  get_num_wildlife_sightings(): number {
    return this.wildlife_sightings.length;
  }

  add_wildlife_sighting(wildlife_sighting: WildlifeSighting) {
    this.wildlife_sightings.push(wildlife_sighting);
  }

  remove_wildlife_sighting(wildlife_sighting: WildlifeSighting) {
    this.wildlife_sightings.splice(
      this.wildlife_sightings.indexOf(wildlife_sighting),
      1
    );
  }

  get_wildlife_sighting_by_image_id(image_id: string): WildlifeSighting | null {
    let returnValue = null;
    for (let wildlife_sighting of this.wildlife_sightings) {
      if (wildlife_sighting.image_id == image_id) {
        returnValue = wildlife_sighting;
      }
    }
    return returnValue;
  }

  verify_data_batch_id(batch_id: string): boolean {
    return !this.data_batch_ids.some((existing_id) => batch_id === existing_id);
  }

  add_data_batch_id(batch_id: string) {
    this.data_batch_ids.push(batch_id);
  }

  remove_data_batch_id(batch_id: string) {
    this.data_batch_ids.splice(this.data_batch_ids.indexOf(batch_id), 1);
  }
}
