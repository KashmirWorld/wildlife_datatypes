"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Study = void 0;
class Study {
    constructor(uuid, name, end_date, description, threshold) {
        this.name = name;
        this.project_uuid = uuid;
        this.start_date = Math.floor(new Date().getTime() / 1000);
        this.end_date = end_date;
        this.description = description;
        this.threshold = threshold;
        this.camera_stations = [];
        this.lastupdated = this.start_date;
    }
    get start_date_as_date() {
        return new Date(this.start_date * 1000);
    }
    get end_date_as_date() {
        return new Date(this.end_date * 1000);
    }
    get_camera_station_by_camera_id(camera_id) {
        for (let camera_station of this.camera_stations) {
            if (camera_station.camera_id == camera_id) {
                return camera_station;
            }
        }
        return null;
    }
    add_camera_station(camera_station) {
        this.camera_stations.push(camera_station);
    }
    remove_camera_station(camera_station) {
        this.camera_stations.splice(this.camera_stations.indexOf(camera_station), 1);
    }
}
exports.Study = Study;
