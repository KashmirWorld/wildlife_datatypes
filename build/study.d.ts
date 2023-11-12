import { CameraStation } from "./camera_station";
export declare class Study {
    name: string;
    readonly project_uuid: string;
    readonly start_date: number;
    end_date: number;
    description: string;
    threshold: number;
    lastupdated: number;
    camera_stations: CameraStation[];
    constructor(uuid: string, name: string, end_date: number, description: string, threshold: number);
    get start_date_as_date(): Date;
    get end_date_as_date(): Date;
    get_camera_station_by_camera_id(camera_id: string): CameraStation | null;
    add_camera_station(camera_station: CameraStation): void;
    remove_camera_station(camera_station: CameraStation): void;
}
