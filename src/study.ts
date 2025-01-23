import "reflect-metadata";

import { Type } from "class-transformer";
import { Camera } from "./Camera";
import { Sighting } from "./wildlife_sighting";

export class Study {
  public readonly name: string;
  private ecosystem: string;
  private start_date: number;
  private end_date: number | null;
  private last_update: number;
  private description: string;
  private confidence_threshold: number;

  private batch_uuids: string[];

  @Type(() => Camera)
  private cameras: Camera[];
  @Type(() => Sighting)
  private sightings: Sighting[];

  constructor(
    name: string,
    ecosystem: string,
    end_date: number | null,
    description: string,
    confidence_threshold: number
  ) {
    this.name = name;
    this.ecosystem = ecosystem;
    this.start_date = Math.floor(new Date().getTime() / 1000);
    this.end_date = end_date;
    this.last_update = this.start_date;
    this.description = description;
    this.confidence_threshold = confidence_threshold;

    this.cameras = [];
    this.batch_uuids = [];
    this.sightings = [];
  }

  public get_start_date_as_date(): Date {
    return new Date(this.start_date * 1000);
  }

  public get_end_date_as_date(): Date | null {
    if (this.end_date) {
      return new Date(this.end_date * 1000);
    } else {
      return null;
    }
  }

  public get_last_updated_as_date(): Date {
    return new Date(this.last_update * 1000);
  }

  public get_cameras(): Camera[] {
    return this.cameras;
  }

  public get_num_cameras(): number {
    return this.cameras.length;
  }

  public add_camera_station(camera: Camera) {
    this.cameras.push(camera);
  }

  public remove_camera_station(camera: Camera) {
    this.cameras.splice(
      this.cameras.findIndex((x) => x.camera_id === camera.camera_id),
      1
    );
  }

  public get_camera_by_camera_id(camera_id: string): Camera | null {
    this.cameras.forEach((camera) => {
      if (camera.camera_id == camera_id) {
        return camera;
      }
    });
    return null;
  }

  public get_num_sightings(): number {
    return this.sightings.length;
  }

  public add_sighting(sighting: Sighting) {
    this.sightings.push(sighting);
  }

  public remove_sighting(sighting: Sighting) {
    this.sightings.splice(
      this.sightings.findIndex((x) => x.uuid === sighting.uuid),
      1
    );
  }

  get_sighting_by_image_id(image_id: string): Sighting | null {
    for (let sighting of this.sightings) {
      if (sighting.image_id == image_id) {
        return sighting;
      }
    }
    return null;
  }

  verify_batch_uuid(batch_uuid: string): boolean {
    return !this.batch_uuids.some(
      (existing_uuid) => batch_uuid === existing_uuid
    );
  }

  add_batch_uuid(batch_uuid: string) {
    this.batch_uuids.push(batch_uuid);
  }

  remove_batch_id(batch_uuid: string) {
    this.batch_uuids.splice(
      this.batch_uuids.findIndex((x) => x === batch_uuid),
      1
    );
  }
}
