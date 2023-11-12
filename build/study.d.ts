import { CameraStation } from "./camera_station";
import { WildlifeSighting } from "./wildlife_sighting";
import 'reflect-metadata';
export declare class Study {
    name: string;
    readonly project_uuid: string;
    readonly start_date: number;
    end_date: number;
    description: string;
    threshold: number;
    lastupdated: number;
    data_batch_uuids: string[];
    camera_stations: CameraStation[];
    wildlife_sightings: WildlifeSighting[];
    constructor(uuid: string, name: string, end_date: number, description: string, threshold: number);
    get_start_date_as_date(): Date;
    get_end_date_as_date(): Date;
    get_camera_station_by_camera_id(camera_id: string): CameraStation | null;
    get_camera_station_by_id(id: string): CameraStation | null;
    add_camera_station(camera_station: CameraStation): void;
    remove_camera_station(camera_station: CameraStation): void;
    get_wildlife_sighting_by_image_id(image_id: string): WildlifeSighting | null;
    add_wildlife_sighting(wildlife_sighting: WildlifeSighting): void;
    remove_wildlife_sighting(wildlife_sighting: WildlifeSighting): void;
    add_data_batch_uuid(batch_uuid: string): void;
    remove_data_batch_uuid(batch_uuid: string): void;
}
